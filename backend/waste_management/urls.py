from django.urls import path
from .views import VehicleListView, WardListView

urlpatterns = [
    path('', VehicleListView.as_view(), name='vehicle_list'),
    path('wards/', WardListView.as_view(), name='ward_list'),
]
