from rest_framework import serializers
from .models import CleanupDrive, DriveRegistration, Certificate

class CleanupDriveSerializer(serializers.ModelSerializer):
    participant_count = serializers.ReadOnlyField()
    is_joined = serializers.SerializerMethodField()

    class Meta:
        model = CleanupDrive
        fields = ('id', 'title', 'description', 'location', 'date', 'time', 'max_participants', 'participant_count', 'is_joined', 'created_at')

    def get_is_joined(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return DriveRegistration.objects.filter(user=request.user, cleanup_drive=obj).exists()
        return False

class DriveRegistrationSerializer(serializers.ModelSerializer):
    drive_title = serializers.ReadOnlyField(source='cleanup_drive.title')

    class Meta:
        model = DriveRegistration
        fields = ('id', 'user', 'cleanup_drive', 'drive_title', 'registered_at')

class CertificateSerializer(serializers.ModelSerializer):
    participant_name = serializers.ReadOnlyField(source='user.name')
    drive_title = serializers.ReadOnlyField(source='cleanup_drive.title')
    location = serializers.ReadOnlyField(source='cleanup_drive.location')
    date = serializers.ReadOnlyField(source='cleanup_drive.date')

    class Meta:
        model = Certificate
        fields = ('id', 'certificate_id', 'user', 'participant_name', 'cleanup_drive', 'drive_title', 'location', 'date', 'issued_at', 'qr_code_hash')

