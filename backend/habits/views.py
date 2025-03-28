# views.py
from rest_framework import viewsets
from django.contrib.auth.models import User
from .models import Habit, CheckIn
from .serializers import HabitSerializer, CheckInSerializer
from django.views.decorators.csrf import csrf_exempt
from django.core.serializers import serialize
from django.http import JsonResponse
import json


class HabitViewSet(viewsets.ModelViewSet):
    queryset = Habit.objects.all()
    serializer_class = HabitSerializer

    # def get_queryset(self):
    #     return self.queryset.filter(user=self.request.user)

class CheckInViewSet(viewsets.ModelViewSet):
    queryset = CheckIn.objects.all()
    serializer_class = CheckInSerializer


def habit_list(request):
    habits = Habit.objects.all()
    data = serialize('json', habits)
    return JsonResponse(data, safe=False)


@csrf_exempt
def register_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data['username']  # Corrigido: acesso ao dicionário com colchetes
            email = data['email']        # Corrigido: acesso ao dicionário com colchetes
            password = data['password']  # Corrigido: acesso ao dicionário com colchetes

            if not username or not password:
                return JsonResponse({'error': 'Username e senha são obrigatórios!'}, status=400)
            
            if User.objects.filter(username=username).exists():
                return JsonResponse({'error': 'Usuário já existe!'}, status=400)
            
            user = User.objects.create_user(username=username, email=email, password=password)
            return JsonResponse({'message': 'Usuário registrado com sucesso!', 'user': user.username})

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
        
    return JsonResponse({'error': 'Método não permitido'}, status=405)

