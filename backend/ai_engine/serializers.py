from rest_framework import serializers
from .models import Hotspot, Recommendation, AIReport, PredictionHistory

class HotspotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotspot
        fields = '__all__'

class RecommendationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recommendation
        fields = '__all__'

class AIReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = AIReport
        fields = '__all__'

class PredictionHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = PredictionHistory
        fields = '__all__'
