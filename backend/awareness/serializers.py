from rest_framework import serializers
from .models import Campaign, EducationalPoster, EnvironmentalTip, QuizQuestion, Article

class CampaignSerializer(serializers.ModelSerializer):
    class Meta:
        model = Campaign
        fields = '__all__'

class EducationalPosterSerializer(serializers.ModelSerializer):
    class Meta:
        model = EducationalPoster
        fields = '__all__'

class EnvironmentalTipSerializer(serializers.ModelSerializer):
    class Meta:
        model = EnvironmentalTip
        fields = '__all__'

class QuizQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizQuestion
        fields = '__all__'

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'
