from rest_framework import serializers
from .models import Complaint, Feedback
from accounts.serializers import UserSerializer

class FeedbackSerializer(serializers.ModelSerializer):
    user_name = serializers.ReadOnlyField(source='user.name')

    class Meta:
        model = Feedback
        fields = ('id', 'complaint', 'user', 'user_name', 'rating', 'comment', 'created_at')
        read_only_fields = ('id', 'user', 'created_at')

class ComplaintSerializer(serializers.ModelSerializer):
    reported_by_name = serializers.ReadOnlyField(source='reported_by.name')
    feedback = FeedbackSerializer(read_only=True)

    class Meta:
        model = Complaint
        fields = (
            'id', 'complaint_id', 'category', 'description', 'image',
            'latitude', 'longitude', 'address', 'ward', 'priority', 'status',
            'reported_by', 'reported_by_name', 'assigned_team',
            'created_at', 'updated_at', 'feedback'
        )
        read_only_fields = ('id', 'complaint_id', 'reported_by', 'created_at', 'updated_at')
