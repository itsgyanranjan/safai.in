from django.contrib import admin
from .models import Vehicle, Ward

@admin.register(Vehicle)
class VehicleAdmin(admin.ModelAdmin):
    list_display = ('vehicle_number', 'driver', 'route', 'status', 'last_updated')
    list_filter = ('status', 'route')

@admin.register(Ward)
class WardAdmin(admin.ModelAdmin):
    list_display = ('name', 'cleanliness_score', 'total_complaints', 'resolved_complaints')
