from rest_framework import status, generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import CleanupDrive, DriveRegistration, Certificate
from .serializers import CleanupDriveSerializer, DriveRegistrationSerializer, CertificateSerializer

class CleanupDriveListCreateView(generics.ListCreateAPIView):
    queryset = CleanupDrive.objects.all().order_by('date')
    serializer_class = CleanupDriveSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class CleanupDriveDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CleanupDrive.objects.all()
    serializer_class = CleanupDriveSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class JoinDriveView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        try:
            drive = CleanupDrive.objects.get(pk=pk)
        except CleanupDrive.DoesNotExist:
            return Response({'error': 'Cleanup drive not found'}, status=status.HTTP_404_NOT_FOUND)

        registration, created = DriveRegistration.objects.get_or_create(
            user=request.user,
            cleanup_drive=drive
        )

        if created:
            # Award 100 reward points for joining a cleanup drive
            request.user.reward_points += 100
            request.user.save()
            return Response({'message': f'Successfully joined {drive.title}! You earned 100 reward points.'}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message': 'You are already registered for this drive.'}, status=status.HTTP_200_OK)

class LeaveDriveView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        try:
            drive = CleanupDrive.objects.get(pk=pk)
            registration = DriveRegistration.objects.get(user=request.user, cleanup_drive=drive)
            registration.delete()
            return Response({'message': f'You have left {drive.title}.'}, status=status.HTTP_200_OK)
        except (CleanupDrive.DoesNotExist, DriveRegistration.DoesNotExist):
            return Response({'error': 'Registration not found'}, status=status.HTTP_404_NOT_FOUND)

class CertificateListView(generics.ListAPIView):
    serializer_class = CertificateSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            if getattr(user, 'role', '') == 'ADMIN' or user.is_staff:
                return Certificate.objects.all().order_by('-issued_at')
            return Certificate.objects.filter(user=user).order_by('-issued_at')
        return Certificate.objects.all().order_by('-issued_at')

class VerifyParticipantView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        drive_id = request.data.get('cleanup_drive_id')
        user_id = request.data.get('user_id')

        try:
            drive = CleanupDrive.objects.get(id=drive_id)
        except CleanupDrive.DoesNotExist:
            return Response({'error': 'Drive not found'}, status=status.HTTP_404_NOT_FOUND)

        from django.contrib.auth import get_user_model
        User = get_user_model()
        target_user = request.user
        if user_id:
            try:
                target_user = User.objects.get(id=user_id)
            except User.DoesNotExist:
                pass

        cert, created = Certificate.objects.get_or_create(
            user=target_user,
            cleanup_drive=drive
        )

        if created:
            target_user.reward_points += 150
            target_user.save()

        serializer = CertificateSerializer(cert)
        return Response({
            'message': 'Citizen participation verified & digital certificate issued!',
            'certificate': serializer.data
        }, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)
