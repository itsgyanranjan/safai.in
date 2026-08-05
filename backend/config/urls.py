from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

def health_check(request):
    return JsonResponse({"status": "healthy", "service": "safai-backend"})

schema_view = get_schema_view(
   openapi.Info(
      title="SAFAI Platform API",
      default_version='v1',
      description="API documentation for SAFAI — Swachhata Abhiyan Digital Platform",
      contact=openapi.Contact(email="contact@safai.gov.in"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('', health_check, name='root_health'),
    path('health/', health_check, name='health_check'),
    path('api/', health_check, name='api_health'),
    path('admin/', admin.site.urls),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('api/auth/', include('accounts.urls')),
    path('api/complaints/', include('complaints.urls')),
    path('api/drives/', include('cleanup_drives.urls')),
    path('api/vehicles/', include('waste_management.urls')),
    path('api/analytics/', include('analytics.urls')),
    path('api/rewards/', include('rewards.urls')),
    path('api/ai/', include('ai_engine.urls')),
    path('api/awareness/', include('awareness.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.BASE_DIR / 'staticfiles')



