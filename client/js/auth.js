function getUser() {
  const raw = localStorage.getItem('zhcet_user');
  return raw ? JSON.parse(raw) : null;
}

function saveUser(user) {
  localStorage.setItem('zhcet_user', JSON.stringify(user));
}

function clearUser() {
  localStorage.removeItem('zhcet_user');
}

async function logout() {
  await api.post('/api/auth/logout');
  clearUser();
  window.location.href = '/pages/login.html';
}


function requireRole(...roles) {
  const user = getUser();
  if (!user) { window.location.href = '/pages/login.html'; return null; }
  if (!roles.includes(user.role)) { window.location.href = '/index.html'; return null; }
  return user;
}


function renderNav() {
  const user = getUser();
  const authBtn = document.getElementById('nav-auth');
  const adminLink   = document.getElementById('nav-admin');
  const facultyLink = document.getElementById('nav-faculty');

  if (authBtn) {
    if (user) {
      authBtn.textContent = 'Logout';
      authBtn.href = '#';
      authBtn.onclick = (e) => { e.preventDefault(); logout(); };
    } else {
      authBtn.textContent = 'Login';
      authBtn.href = '/pages/login.html';
    }
  }
  if (adminLink)   adminLink.style.display = user?.role === 'admin'   ? 'inline' : 'none';
  if (facultyLink) facultyLink.style.display = user?.role === 'faculty' ? 'inline' : 'none';
}