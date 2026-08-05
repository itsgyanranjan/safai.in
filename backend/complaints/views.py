from rest_framework import status, generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Complaint, Feedback
from .serializers import ComplaintSerializer, FeedbackSerializer

class ComplaintListCreateView(generics.ListCreateAPIView):
    serializer_class = ComplaintSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        if not user.is_authenticated:
            return Complaint.objects.all().order_by('-created_at')
        if user.role == 'ADMIN':
            return Complaint.objects.all().order_by('-created_at')
        # Citizens see all or their own based on query param
        mine = self.request.query_params.get('mine')
        if mine == 'true':
            return Complaint.objects.filter(reported_by=user).order_by('-created_at')
        return Complaint.objects.all().order_by('-created_at')

    def perform_create(self, serializer):
        complaint = serializer.save(reported_by=self.request.user)
        # Award 50 points to user for reporting an issue
        user = self.request.user
        user.reward_points += 50
        user.save()

class ComplaintDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Complaint.objects.all()
    serializer_class = ComplaintSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    lookup_field = 'pk'

class SubmitFeedbackView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        try:
            complaint = Complaint.objects.get(pk=pk)
        except Complaint.DoesNotExist:
            return Response({'error': 'Complaint not found'}, status=status.HTTP_404_NOT_FOUND)

        if complaint.status != 'RESOLVED':
            return Response({'error': 'Feedback can only be submitted for resolved complaints'}, status=status.HTTP_400_BAD_REQUEST)

        rating = request.data.get('rating', 5)
        comment = request.data.get('comment', '')

        feedback, created = Feedback.objects.update_or_create(
            complaint=complaint,
            defaults={'user': request.user, 'rating': rating, 'comment': comment}
        )

        # Award 20 bonus points for feedback
        request.user.reward_points += 20
        request.user.save()

        serializer = FeedbackSerializer(feedback)
        return Response(serializer.data, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)
