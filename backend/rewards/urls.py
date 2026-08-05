from django.urls import path
from .views import UserRewardsView, LeaderboardView

urlpatterns = [
    path('', UserRewardsView.as_view(), name='user_rewards'),
    path('leaderboard/', LeaderboardView.as_view(), name='rewards_leaderboard'),
]
