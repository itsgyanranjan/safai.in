from django.urls import path
from .views import (
    CleanupDriveListCreateView,
    CleanupDriveDetailView,
    JoinDriveView,
    LeaveDriveView,
    CertificateListView,
    VerifyParticipantView
)

urlpatterns = [
    path('', CleanupDriveListCreateView.as_view(), name='drive_list_create'),
    path('<int:pk>/', CleanupDriveDetailView.as_view(), name='drive_detail'),
    path('<int:pk>/join/', JoinDriveView.as_view(), name='drive_join'),
    path('<int:pk>/leave/', LeaveDriveView.as_view(), name='drive_leave'),
    path('certificates/', CertificateListView.as_view(), name='certificate_list'),
    path('verify-participant/', VerifyParticipantView.as_view(), name='verify_participant'),
]
