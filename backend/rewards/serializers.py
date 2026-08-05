from rest_framework import serializers
from .models import Reward
from accounts.serializers import UserSerializer

class RewardSerializer(serializers.ModelSerializer):
    user_name = serializers.ReadOnlyField(source='user.name')

    class Meta:
        model = Reward
        fields = ('id', 'user', 'user_name', 'points', 'reason', 'created_at')
