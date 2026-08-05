from rest_framework import serializers
from .models import Vehicle, Ward

class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = ('id', 'vehicle_number', 'driver', 'latitude', 'longitude', 'route', 'status', 'last_updated')

class WardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ward
        fields = ('id', 'name', 'cleanliness_score', 'total_complaints', 'resolved_complaints', 'updated_at')
