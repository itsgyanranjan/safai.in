from django.contrib import admin
from .models import Reward

@admin.register(Reward)
class RewardAdmin(admin.ModelAdmin):
    list_display = ('user', 'points', 'reason', 'created_at')
    search_fields = ('user__name', 'reason')
