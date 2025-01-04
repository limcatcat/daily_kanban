from rest_framework.authentication import TokenAuthentication

class DebugTokenAuthentication(TokenAuthentication):
    def authenticate(self, request):
        print(f"Authorization header: {request.META.get('HTTP_AUTHORIZATION')}")
        return super().authenticate(request)