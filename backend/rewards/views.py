from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from .models import Reward
from .serializers import RewardSerializer

User = get_user_model()

class UserRewardsView(generics.ListAPIView):
    serializer_class = RewardSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Reward.objects.filter(user=self.request.user).order_by('-created_at')

class LeaderboardView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        db_users = User.objects.filter(role='CITIZEN').order_by('-reward_points')[:10]
        leaderboard_data = []

        # Default sample top leaders from requirements if DB is small
        sample_leaders = [
            {'rank': 1, 'name': 'Aarav Sharma', 'points': 4250, 'badge': 'Cleanliness Champion'},
            {'rank': 2, 'name': 'Neha Verma', 'points': 3890, 'badge': 'Cleanup Volunteer'},
            {'rank': 3, 'name': 'Rohit Singh', 'points': 3450, 'badge': 'Active Citizen'},
            {'rank': 4, 'name': 'Priya Patel', 'points': 2980, 'badge': 'First Report'},
            {'rank': 5, 'name': 'Vikram Das', 'points': 2640, 'badge': 'Cleanup Volunteer'},
        ]

        if db_users.exists():
            rank = 1
            for u in db_users:
                badge = 'Cleanliness Champion' if u.reward_points >= 4000 else ('Cleanup Volunteer' if u.reward_points >= 2000 else 'Active Citizen')
                leaderboard_data.append({
                    'rank': rank,
                    'name': u.name,
                    'points': u.reward_points,
                    'badge': badge
                })
                rank += 1
        else:
            leaderboard_data = sample_leaders

        return Response(leaderboard_data, status=status.HTTP_200_OK)
