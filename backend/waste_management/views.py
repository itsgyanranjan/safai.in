from rest_framework import generics, permissions
from .models import Vehicle, Ward
from .serializers import VehicleSerializer, WardSerializer

class VehicleListView(generics.ListCreateAPIView):
    queryset = Vehicle.objects.all().order_by('id')
    serializer_class = VehicleSerializer
    permission_classes = [permissions.AllowAny]

class WardListView(generics.ListCreateAPIView):
    queryset = Ward.objects.all().order_by('-cleanliness_score')
    serializer_class = WardSerializer
    permission_classes = [permissions.AllowAny]
