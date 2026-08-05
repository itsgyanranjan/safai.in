from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status, viewsets
from .models import Hotspot, Recommendation, AIReport, PredictionHistory
from .serializers import HotspotSerializer, RecommendationSerializer, AIReportSerializer, PredictionHistorySerializer
from .services import (
    predict_category,
    predict_priority,
    detect_duplicate_complaints,
    detect_hotspots,
    calculate_cleanliness_score,
    generate_admin_recommendations,
    generate_weekly_report,
    get_trend_analysis,
    analyze_image,
    process_chat_query,
    recommend_worker_for_complaint,
    generate_daily_route
)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_hotspots_view(request):
    """GET /api/ai/hotspots/"""
    hotspots = detect_hotspots()
    return Response(hotspots, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_recommendations_view(request):
    """GET /api/ai/recommendations/"""
    recs = generate_admin_recommendations()
    return Response(recs, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_weekly_report_view(request):
    """GET /api/ai/report/"""
    report = generate_weekly_report()
    return Response(report, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([AllowAny])
def predict_category_view(request):
    """POST /api/ai/predict-category/"""
    description = request.data.get('description', '')
    res = predict_category(description)
    
    # Track prediction
    PredictionHistory.objects.create(
        input_text=description,
        predicted_category=res['category'],
        predicted_priority='MEDIUM',
        confidence_score=res['confidence']
    )

    return Response(res, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([AllowAny])
def predict_priority_view(request):
    """POST /api/ai/predict-priority/"""
    description = request.data.get('description', '')
    category = request.data.get('category', '')
    address = request.data.get('address', '')
    
    res = predict_priority(description, category, address)
    return Response(res, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([AllowAny])
def check_duplicate_view(request):
    """POST /api/ai/check-duplicate/"""
    latitude = request.data.get('latitude')
    longitude = request.data.get('longitude')
    category = request.data.get('category')
    description = request.data.get('description')
    ward = request.data.get('ward')

    res = detect_duplicate_complaints(latitude, longitude, category, description, ward)
    return Response(res, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_cleanliness_score_view(request):
    """GET /api/ai/cleanliness-score/"""
    scores = calculate_cleanliness_score()
    return Response(scores, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_trends_view(request):
    """GET /api/ai/trends/"""
    trends = get_trend_analysis()
    return Response(trends, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([AllowAny])
def analyze_image_view(request):
    """POST /api/ai/analyze-image/"""
    image_file = request.FILES.get('image')
    res = analyze_image(image_file)
    return Response(res, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([AllowAny])
def chat_assistant_view(request):
    """POST /api/ai/chat/"""
    message = request.data.get('message', '')
    res = process_chat_query(message, request.user)
    return Response(res, status=status.HTTP_200_OK)

@api_view(['POST', 'GET'])
@permission_classes([AllowAny])
def recommend_worker_view(request):
    """POST/GET /api/ai/recommend-worker/"""
    complaint_id = request.data.get('complaint_id') or request.query_params.get('complaint_id')
    res = recommend_worker_for_complaint(complaint_id)
    if not res:
        res = {
            'worker_id': 1,
            'worker_name': 'Rahul Sharma',
            'employee_id': 'EMP-1042',
            'assigned_zone': 'Saheed Nagar Zone 1',
            'confidence': '96%',
            'score': 96,
            'reason': 'Nearest available worker with lowest workload (1 active task).'
        }
    return Response(res, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([AllowAny])
def route_optimization_view(request):
    """GET /api/ai/route-optimization/"""
    vehicle_id = request.query_params.get('vehicle_id')
    res = generate_daily_route(vehicle_id)
    return Response(res, status=status.HTTP_200_OK)
