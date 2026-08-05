from rest_framework import viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Campaign, EducationalPoster, EnvironmentalTip, QuizQuestion, Article
from .serializers import (
    CampaignSerializer,
    EducationalPosterSerializer,
    EnvironmentalTipSerializer,
    QuizQuestionSerializer,
    ArticleSerializer
)

class CampaignViewSet(viewsets.ModelViewSet):
    queryset = Campaign.objects.all().order_by('-created_at')
    serializer_class = CampaignSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class EducationalPosterViewSet(viewsets.ModelViewSet):
    queryset = EducationalPoster.objects.all().order_by('-created_at')
    serializer_class = EducationalPosterSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class EnvironmentalTipViewSet(viewsets.ModelViewSet):
    queryset = EnvironmentalTip.objects.all().order_by('-created_at')
    serializer_class = EnvironmentalTipSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class QuizQuestionViewSet(viewsets.ModelViewSet):
    queryset = QuizQuestion.objects.all().order_by('id')
    serializer_class = QuizQuestionSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all().order_by('-created_at')
    serializer_class = ArticleSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class SubmitQuizView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        user_answers = request.data.get('answers', {}) # dict of {question_id: selected_option}
        questions = QuizQuestion.objects.all()
        
        correct_count = 0
        total_questions = questions.count() or 1
        earned_points = 0

        for q in questions:
            user_ans = user_answers.get(str(q.id)) or user_answers.get(q.id)
            if user_ans and user_ans.upper() == q.correct_option.upper():
                correct_count += 1
                earned_points += q.reward_points

        score_pct = int((correct_count / float(total_questions)) * 100)

        # Credit points if user is authenticated
        if request.user and request.user.is_authenticated:
            request.user.reward_points += earned_points
            request.user.save()

        return Response({
            'score_percentage': score_pct,
            'correct_count': correct_count,
            'total_questions': total_questions,
            'earned_points': earned_points,
            'message': f"Quiz completed! You scored {correct_count}/{total_questions} ({score_pct}%) and earned +{earned_points} Swachhata Reward Points!"
        }, status=status.HTTP_200_OK)
