# 🏆 **MyHabit - Gerencie Seus Hábitos de Forma Eficiente**

Bem-vindo ao **MyHabit**! Este aplicativo ajuda você a organizar seus hábitos diários, acompanhar seu progresso e visualizar relatórios detalhados. 💪📊  

---

## 📌 **Funcionalidades**  

✔️ **Criação de Hábitos**: Adicione novos hábitos definindo horário, categoria e localização.  
✔️ **Listagem e Status**: Veja seus hábitos do dia e marque como concluídos.  
✔️ **Relatórios**: Acesse os hábitos concluídos e pendentes em qualquer data.  
✔️ **Autenticação JWT**: Login seguro com token de autenticação. 🔑  
✔️ **Banco de Dados SQLite**: Armazena seus hábitos de forma leve e eficiente.  
✔️ **Navegação Intuitiva**: Interface simples e amigável. 🎨  

---

## ⚙️ **Tecnologias Utilizadas**  

### 🔹 **Frontend (React Native + Expo)**  
- React Native  
- Expo  
- React Navigation  
- Axios  
- React Native Calendars  
- React Native Picker  
- React Native Vector Icons  
- Styled Components  

### 🔹 **Backend (Django REST Framework)**  
- Django  
- Django REST Framework  
- Django SQLite  
- JWT Authentication (ObtainAuthToken)  

---

## 🚀 **Instalação e Configuração**  

### **1️⃣ Clone o Repositório**  
```bash
git clone https://github.com/samuelamorimm/my-habit.git
cd my-habit
```

---

### 🎮 **2️⃣ Configuração do Backend**  

#### 🔹 Criar um ambiente virtual  
```bash
cd backend
python -m venv venv  # Criando ambiente virtual
source venv/bin/activate  # (Linux/macOS)
venv\Scripts\activate  # (Windows)
```

#### 🔹 Instalar dependências  
```bash
pip install -r requirements.txt
```

#### 🔹 Aplicar migrações e rodar o servidor  
```bash
python manage.py migrate
python manage.py runserver
```
O backend estará disponível em **http://127.0.0.1:8000** 💼  

---

### 📱 **3️⃣ Configuração do Frontend**  

#### 🔹 Instalar dependências  
```bash
cd ../mobile
npm install
```

#### 🔹 Rodar o projeto no Expo  
```bash
npx expo start
```
Agora, basta escanear o QR Code com o Expo Go ou rodar no emulador! 📱🎉  

---

## 🔮 **Melhorias Futuras**  

🔹 **Funcionalidade de Perfil**: Adicionar edição de perfil e avatar.  
🔹 **Login com Google**: Autenticação social para facilitar o acesso.  
🔹 **Relatórios Avançados**: Incluir gráficos detalhados 📊.  
🔹 **Notificações**: Alertas para lembrar dos hábitos no horário certo.  
🔹 **Sincronização na Nuvem**: Possibilidade de backup e acesso de diferentes dispositivos. ☁️  

---

## 🤝 **Contribuição**  
Quer ajudar a melhorar o **MyHabit**? Fique à vontade para abrir issues, sugerir melhorias ou enviar pull requests! 🙌  

📉 **Licença**: MIT 🐟  

🚀 *Vamos construir hábitos melhores juntos!*

