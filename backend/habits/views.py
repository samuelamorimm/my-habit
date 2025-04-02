# views.py
from rest_framework import viewsets
from django.contrib.auth.models import User
from .models import Habit, CheckIn
from .serializers import HabitSerializer, CheckInSerializer
from django.views.decorators.csrf import csrf_exempt
from django.core.serializers import serialize
from django.http import JsonResponse
import json
from rest_framework import status


class HabitViewSet(viewsets.ModelViewSet):
    queryset = Habit.objects.all()
    serializer_class = HabitSerializer

    # def get_queryset(self):
    #     return self.queryset.filter(user=self.request.user)

class CheckInViewSet(viewsets.ModelViewSet):
    queryset = CheckIn.objects.all()
    serializer_class = CheckInSerializer

    def create(self, request, *args, **kwargs):
        habit_id = request.data.get("habit")  # Pegando o ID do hábito

        try:
            habit = Habit.objects.get(id=habit_id)
        except Habit.DoesNotExist:
            return JsonResponse({"error": "Hábito não encontrado"}, status=status.HTTP_404_NOT_FOUND)

        # Criando o check-in
        checkin = CheckIn.objects.create(
            habit=habit,
            status=True  # Marcando como concluído
        )

        return JsonResponse(CheckInSerializer(checkin).data, status=status.HTTP_201_CREATED)


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

