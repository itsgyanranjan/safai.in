from django.contrib import admin
from .models import Campaign, EducationalPoster, EnvironmentalTip, QuizQuestion, Article

@admin.register(Campaign)
class CampaignAdmin(admin.ModelAdmin):
    list_display = ('title', 'location', 'duration', 'participants_count', 'created_at')

@admin.register(EducationalPoster)
class EducationalPosterAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'download_count', 'created_at')

@admin.register(EnvironmentalTip)
class EnvironmentalTipAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'icon_name', 'created_at')

@admin.register(QuizQuestion)
class QuizQuestionAdmin(admin.ModelAdmin):
    list_display = ('question', 'correct_option', 'reward_points', 'created_at')

@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'author', 'read_time', 'created_at')
