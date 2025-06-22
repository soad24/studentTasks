// نظام أثر - سجل الممارسات المهنية

// بيانات تجريبية للمستخدمين
const users = {
    'student@athar.om': {
        name: 'أحمد محمد الشريف',
        role: 'student',
        studentId: '2021001234',
        branch: 'مسقط',
        college: 'الهندسة والتكنولوجيا',
        department: 'هندسة الحاسوب',
        phone: '96890123456'
    },
    'reviewer@athar.om': {
        name: 'فاطمة علي المقبالي',
        role: 'reviewer',
        branch: 'مسقط'
    },
    'approver@athar.om': {
        name: 'سالم بن عبدالله الهنائي',
        role: 'approver',
        branch: 'مسقط'
    },
    'certifier@athar.om': {
        name: 'عائشة بنت سعيد البلوشي',
        role: 'certifier',
        branch: 'مسقط'
    },
    'admin@athar.om': {
        name: 'مدير النظام',
        role: 'admin'
    }
};

// بيانات تجريبية للممارسات المهنية
const practicesData = [
    {
        id: 1,
        title: 'ورشة عمل في الذكاء الاصطناعي',
        type: 'ورش العمل والندوات',
        participationType: 'حضور',
        participationLevel: 'دولي',
        organization: 'شركة مايكروسوفت',
        startDate: '2024-01-15',
        endDate: '2024-01-17',
        duration: 24,
        points: 45,
        status: 'approved'
    },
    {
        id: 2,
        title: 'تدريب صيفي في تطوير التطبيقات',
        type: 'التدريب على رأس العمل',
        participationType: 'تدريب عملي',
        participationLevel: 'محلي',
        organization: 'شركة عُمان للتكنولوجيا',
        startDate: '2024-06-01',
        endDate: '2024-08-31',
        duration: 480,
        points: 120,
        status: 'approved'
    },
    {
        id: 3,
        title: 'مسابقة البرمجة الوطنية',
        type: 'المسابقات والهاكاثونات',
        participationType: 'مشاركة',
        participationLevel: 'محلي',
        organization: 'وزارة التعليم العالي',
        startDate: '2024-03-10',
        endDate: '2024-03-12',
        duration: 48,
        points: 75,
        status: 'approved'
    },
    {
        id: 4,
        title: 'شهادة AWS Cloud Practitioner',
        type: 'الشهادات الاحترافية',
        participationType: 'حصول على شهادة',
        participationLevel: 'دولي',
        organization: 'Amazon Web Services',
        startDate: '2024-02-01',
        endDate: '2024-02-28',
        duration: 120,
        points: 150,
        status: 'approved'
    },
    {
        id: 5,
        title: 'عضوية في جمعية مهندسي الحاسوب',
        type: 'عضوية الجمعيات المهنية',
        participationType: 'عضو',
        participationLevel: 'محلي',
        organization: 'جمعية مهندسي الحاسوب العُمانية',
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        duration: 0,
        points: 60,
        status: 'approved'
    }
];

let currentUser = null;

// وظائف التنقل
function showLandingPage() {
    document.getElementById('landingPage').classList.remove('d-none');
    document.getElementById('loginPage').classList.add('d-none');
    document.getElementById('mainApp').classList.add('d-none');
}

function showLoginPage() {
    document.getElementById('landingPage').classList.add('d-none');
    document.getElementById('loginPage').classList.remove('d-none');
    document.getElementById('mainApp').classList.add('d-none');
}

function showMainApp() {
    document.getElementById('landingPage').classList.add('d-none');
    document.getElementById('loginPage').classList.add('d-none');
    document.getElementById('mainApp').classList.remove('d-none');
}

function scrollToFeatures() {
    document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
}

// وظائف النسخ
function setupCopyButtons() {
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const textToCopy = this.getAttribute('data-copy');
            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i>';
                this.classList.add('copied');
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.classList.remove('copied');
                }, 2000);
            });
        });
    });
}

// وظيفة إظهار/إخفاء كلمة المرور
function setupPasswordToggle() {
    const toggleBtn = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    
    if (toggleBtn && passwordInput) {
        toggleBtn.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        });
    }
}

// وظيفة تسجيل الدخول
function setupLogin() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            if (users[email] && password === 'password123') {
                currentUser = users[email];
                currentUser.email = email;
                
                // تحديث اسم المستخدم
                document.getElementById('userName').textContent = currentUser.name;
                
                // تحديث التنقل حسب نوع المستخدم
                updateNavigationForUser(currentUser.role);
                
                // عرض التطبيق الرئيسي
                showMainApp();
                
                // تحميل لوحة التحكم
                loadDashboard();
            } else {
                alert('بيانات تسجيل الدخول غير صحيحة');
            }
        });
    }
}

// تحديث التنقل حسب نوع المستخدم
function updateNavigationForUser(role) {
    const practicesNavItem = document.getElementById('practicesNavItem');
    const addPracticeNavItem = document.getElementById('addPracticeNavItem');
    const settingsNavItem = document.getElementById('settingsNavItem');
    const practicesNavText = document.getElementById('practicesNavText');
    
    // إخفاء جميع العناصر أولاً
    if (addPracticeNavItem) addPracticeNavItem.style.display = 'none';
    if (settingsNavItem) settingsNavItem.style.display = 'none';
    
    switch(role) {
        case 'student':
            if (practicesNavText) practicesNavText.textContent = 'ممارساتي المهنية';
            if (addPracticeNavItem) addPracticeNavItem.style.display = 'block';
            break;
        case 'reviewer':
            if (practicesNavText) practicesNavText.textContent = 'الممارسات للمراجعة';
            break;
        case 'approver':
            if (practicesNavText) practicesNavText.textContent = 'الممارسات للاعتماد';
            break;
        case 'certifier':
            if (practicesNavText) practicesNavText.textContent = 'الممارسات للتصديق';
            break;
        case 'admin':
            if (practicesNavText) practicesNavText.textContent = 'جميع الممارسات';
            if (settingsNavItem) settingsNavItem.style.display = 'block';
            break;
    }
    
    // تحديث الشريط الجانبي
    updateSidebar(role);
}

// تحديث الشريط الجانبي
function updateSidebar(role) {
    const sidebarNav = document.getElementById('sidebarNav');
    if (!sidebarNav) return;
    
    let sidebarItems = [];
    
    switch(role) {
        case 'student':
            sidebarItems = [
                { icon: 'fas fa-tachometer-alt', text: 'لوحة التحكم', page: 'dashboard', active: true },
                { icon: 'fas fa-list', text: 'ممارساتي المهنية', page: 'practices' },
                { icon: 'fas fa-plus', text: 'إضافة ممارسة جديدة', page: 'add-practice' },
                { icon: 'fas fa-chart-bar', text: 'تقاريري', page: 'reports' },
                { icon: 'fas fa-user', text: 'الملف الشخصي', page: 'profile' }
            ];
            break;
        case 'reviewer':
            sidebarItems = [
                { icon: 'fas fa-tachometer-alt', text: 'لوحة التحكم', page: 'dashboard', active: true },
                { icon: 'fas fa-search', text: 'الممارسات للمراجعة', page: 'practices' },
                { icon: 'fas fa-chart-bar', text: 'تقارير المراجعة', page: 'reports' }
            ];
            break;
        case 'approver':
            sidebarItems = [
                { icon: 'fas fa-tachometer-alt', text: 'لوحة التحكم', page: 'dashboard', active: true },
                { icon: 'fas fa-stamp', text: 'الممارسات للاعتماد', page: 'practices' },
                { icon: 'fas fa-chart-bar', text: 'تقارير الاعتماد', page: 'reports' }
            ];
            break;
        case 'certifier':
            sidebarItems = [
                { icon: 'fas fa-tachometer-alt', text: 'لوحة التحكم', page: 'dashboard', active: true },
                { icon: 'fas fa-certificate', text: 'الممارسات للتصديق', page: 'practices' },
                { icon: 'fas fa-chart-bar', text: 'تقارير التصديق', page: 'reports' }
            ];
            break;
        case 'admin':
            sidebarItems = [
                { icon: 'fas fa-tachometer-alt', text: 'لوحة التحكم', page: 'dashboard', active: true },
                { icon: 'fas fa-list', text: 'جميع الممارسات', page: 'practices' },
                { icon: 'fas fa-chart-bar', text: 'التقارير والإحصائيات', page: 'reports' },
                { icon: 'fas fa-cog', text: 'الإعدادات', page: 'settings' },
                { icon: 'fas fa-users', text: 'إدارة المستخدمين', page: 'users' }
            ];
            break;
    }
    
    sidebarNav.innerHTML = sidebarItems.map(item => `
        <li class="nav-item">
            <a class="nav-link ${item.active ? 'active' : ''}" href="#" data-page="${item.page}">
                <i class="${item.icon} me-2"></i>
                ${item.text}
            </a>
        </li>
    `).join('');
    
    // إضافة مستمعي الأحداث للروابط
    sidebarNav.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            loadPage(page);
            
            // تحديث الحالة النشطة
            sidebarNav.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// تحميل الصفحات
function loadPage(page) {
    const pageContent = document.getElementById('pageContent');
    
    switch(page) {
        case 'dashboard':
            loadDashboard();
            break;
        case 'practices':
            loadPractices();
            break;
        case 'add-practice':
            loadAddPractice();
            break;
        case 'reports':
            loadReports();
            break;
        case 'final-report':
            loadFinalReport();
            break;
        case 'settings':
            loadSettings();
            break;
        case 'profile':
            loadProfile();
            break;
        default:
            pageContent.innerHTML = '<h2>الصفحة غير موجودة</h2>';
    }
}

// تحميل لوحة التحكم
function loadDashboard() {
    const pageContent = document.getElementById('pageContent');
    
    if (currentUser.role === 'student') {
        const totalPoints = practicesData.reduce((sum, practice) => sum + practice.points, 0);
        const approvedCount = practicesData.filter(p => p.status === 'approved').length;
        const pendingCount = practicesData.filter(p => p.status === 'pending').length;
        
        pageContent.innerHTML = `
            <div class="py-4">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h1 class="h3 mb-0">مرحباً ${currentUser.name}</h1>
                    <span class="badge bg-primary fs-6">${currentUser.studentId}</span>
                </div>

                <!-- Statistics Cards -->
                <div class="row mb-4">
                    <div class="col-xl-3 col-md-6 mb-4">
                        <div class="card stats-card h-100">
                            <div class="card-body">
                                <div class="d-flex justify-content-between">
                                    <div>
                                        <div class="text-white-75 small">إجمالي النقاط</div>
                                        <div class="text-white h4">${totalPoints}</div>
                                    </div>
                                    <div class="text-white-50">
                                        <i class="fas fa-star fa-2x"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-xl-3 col-md-6 mb-4">
                        <div class="card stats-card-success h-100">
                            <div class="card-body">
                                <div class="d-flex justify-content-between">
                                    <div>
                                        <div class="text-white-75 small">معتمدة</div>
                                        <div class="text-white h4">${approvedCount}</div>
                                    </div>
                                    <div class="text-white-50">
                                        <i class="fas fa-check-circle fa-2x"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-xl-3 col-md-6 mb-4">
                        <div class="card stats-card-warning h-100">
                            <div class="card-body">
                                <div class="d-flex justify-content-between">
                                    <div>
                                        <div class="text-white-75 small">في الانتظار</div>
                                        <div class="text-white h4">${pendingCount}</div>
                                    </div>
                                    <div class="text-white-50">
                                        <i class="fas fa-clock fa-2x"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-xl-3 col-md-6 mb-4">
                        <div class="card stats-card-info h-100">
                            <div class="card-body">
                                <div class="d-flex justify-content-between">
                                    <div>
                                        <div class="text-white-75 small">إجمالي الممارسات</div>
                                        <div class="text-white h4">${practicesData.length}</div>
                                    </div>
                                    <div class="text-white-50">
                                        <i class="fas fa-list fa-2x"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Student Record -->
                <div class="student-record">
                    <div class="record-header">
                        <img src="logo.png" alt="شعار الجامعة" class="record-logo">
                        <h2 class="record-title">سجل الطالب للممارسة المهنية (أثر)</h2>
                        <p class="record-subtitle">رحلة الإنجاز والتأثير</p>
                    </div>
                    
                    <div class="student-info">
                        <div class="info-row">
                            <span class="info-label">اسم الطالب:</span>
                            <span class="info-value">${currentUser.name}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">الرقم الجامعي:</span>
                            <span class="info-value">${currentUser.studentId}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">الكلية:</span>
                            <span class="info-value">${currentUser.college}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">التخصص:</span>
                            <span class="info-value">${currentUser.department}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">المرشد الأكاديمي:</span>
                            <span class="info-value">د. محمد بن سالم الكندي</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">الرقم المدني:</span>
                            <span class="info-value">12345678</span>
                        </div>
                    </div>
                    
                    <div class="practices-summary">
                        <div class="summary-card">
                            <div class="summary-number">${totalPoints}</div>
                            <div class="summary-label">إجمالي النقاط</div>
                        </div>
                        <div class="summary-card">
                            <div class="summary-number">${practicesData.length}</div>
                            <div class="summary-label">عدد الممارسات</div>
                        </div>
                        <div class="summary-card">
                            <div class="summary-number">${approvedCount}</div>
                            <div class="summary-label">ممارسات معتمدة</div>
                        </div>
                        <div class="summary-card">
                            <div class="summary-number">${new Date().getFullYear()}</div>
                            <div class="summary-label">السنة الأكاديمية</div>
                        </div>
                    </div>
                    
                    <div class="record-footer">
                        <p>تم إنشاء هذا السجل بتاريخ: ${new Date().toLocaleDateString('ar-SA')}</p>
                        <p>جامعة التقنية والعلوم التطبيقية - ${currentUser.branch}</p>
                    </div>
                </div>

                <!-- Quick Actions -->
                <div class="row mb-4">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-header">
                                <h5 class="card-title mb-0">الإجراءات السريعة</h5>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-3 mb-3">
                                        <button class="btn btn-success w-100" onclick="loadPage('add-practice')">
                                            <i class="fas fa-plus me-2"></i>
                                            إضافة ممارسة جديدة
                                        </button>
                                    </div>
                                    <div class="col-md-3 mb-3">
                                        <button class="btn btn-primary w-100" onclick="loadPage('practices')">
                                            <i class="fas fa-list me-2"></i>
                                            عرض جميع الممارسات
                                        </button>
                                    </div>
                                    <div class="col-md-3 mb-3">
                                        <button class="btn btn-info w-100" onclick="loadPage('final-report')">
                                            <i class="fas fa-download me-2"></i>
                                            تحميل السجل
                                        </button>
                                    </div>
                                    <div class="col-md-3 mb-3">
                                        <button class="btn btn-warning w-100" onclick="loadPage('reports')">
                                            <i class="fas fa-chart-bar me-2"></i>
                                            التقارير
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Recent Practices -->
                <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h5 class="card-title mb-0">أحدث الممارسات المهنية</h5>
                        <button class="btn btn-sm btn-outline-primary" onclick="loadPage('practices')">عرض الكل</button>
                    </div>
                    <div class="card-body">
                        ${practicesData.length > 0 ? `
                            <div class="table-responsive">
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>العنوان</th>
                                            <th>نوع الممارسة</th>
                                            <th>المؤسسة</th>
                                            <th>الحالة</th>
                                            <th>النقاط</th>
                                            <th>التاريخ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${practicesData.slice(0, 5).map(practice => `
                                            <tr>
                                                <td><strong>${practice.title}</strong></td>
                                                <td>${practice.type}</td>
                                                <td>${practice.organization}</td>
                                                <td><span class="badge bg-success">${practice.status === 'approved' ? 'معتمد' : 'في الانتظار'}</span></td>
                                                <td><strong class="text-primary">${practice.points}</strong></td>
                                                <td>${new Date(practice.startDate).toLocaleDateString('ar-SA')}</td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                        ` : `
                            <div class="text-center py-5">
                                <i class="fas fa-clipboard-list text-muted" style="font-size: 4rem;"></i>
                                <h4 class="text-muted mt-3">لا توجد ممارسات مهنية</h4>
                                <p class="text-muted">ابدأ بإضافة أول ممارسة مهنية لك</p>
                                <button class="btn btn-primary" onclick="loadPage('add-practice')">
                                    <i class="fas fa-plus me-2"></i>
                                    إضافة ممارسة جديدة
                                </button>
                            </div>
                        `}
                    </div>
                </div>
            </div>
        `;
    } else {
        // لوحة تحكم للأدوار الأخرى
        pageContent.innerHTML = `
            <div class="py-4">
                <h1 class="h3 mb-4">مرحباً ${currentUser.name}</h1>
                <div class="row">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-body text-center">
                                <h4>لوحة تحكم ${getRoleDisplayName(currentUser.role)}</h4>
                                <p class="text-muted">مرحباً بك في نظام أثر</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

// تحميل صفحة التقارير
function loadReports() {
    const pageContent = document.getElementById('pageContent');
    
    if (currentUser.role === 'student') {
        pageContent.innerHTML = `
            <div class="py-4">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h1 class="h3 mb-0">التقارير والإحصائيات</h1>
                </div>

                <!-- Statistics Overview -->
                <div class="row mb-4">
                    <div class="col-lg-3 col-md-6 mb-4">
                        <div class="card stats-card">
                            <div class="card-body">
                                <div class="d-flex justify-content-between">
                                    <div>
                                        <div class="text-white-75 small">إجمالي النقاط</div>
                                        <div class="text-white h4">${practicesData.reduce((sum, p) => sum + p.points, 0)}</div>
                                    </div>
                                    <div class="text-white-50">
                                        <i class="fas fa-star fa-2x"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-lg-3 col-md-6 mb-4">
                        <div class="card stats-card-success">
                            <div class="card-body">
                                <div class="d-flex justify-content-between">
                                    <div>
                                        <div class="text-white-75 small">ممارسات معتمدة</div>
                                        <div class="text-white h4">${practicesData.filter(p => p.status === 'approved').length}</div>
                                    </div>
                                    <div class="text-white-50">
                                        <i class="fas fa-check-circle fa-2x"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-lg-3 col-md-6 mb-4">
                        <div class="card stats-card-info">
                            <div class="card-body">
                                <div class="d-flex justify-content-between">
                                    <div>
                                        <div class="text-white-75 small">ساعات التدريب</div>
                                        <div class="text-white h4">${practicesData.reduce((sum, p) => sum + p.duration, 0)}</div>
                                    </div>
                                    <div class="text-white-50">
                                        <i class="fas fa-clock fa-2x"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-lg-3 col-md-6 mb-4">
                        <div class="card stats-card-warning">
                            <div class="card-body">
                                <div class="d-flex justify-content-between">
                                    <div>
                                        <div class="text-white-75 small">أنواع مختلفة</div>
                                        <div class="text-white h4">${[...new Set(practicesData.map(p => p.type))].length}</div>
                                    </div>
                                    <div class="text-white-50">
                                        <i class="fas fa-layer-group fa-2x"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Report Generation -->
                <div class="card mb-4">
                    <div class="card-header">
                        <h5 class="card-title mb-0">إنشاء التقارير</h5>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="card border-primary">
                                    <div class="card-body text-center">
                                        <i class="fas fa-file-pdf text-primary mb-3" style="font-size: 3rem;"></i>
                                        <h5>التقرير النهائي للسجل</h5>
                                        <p class="text-muted">تقرير شامل يحتوي على جميع الممارسات المهنية والإحصائيات</p>
                                        <button class="btn btn-primary" onclick="loadPage('final-report')">
                                            <i class="fas fa-download me-2"></i>
                                            إنشاء التقرير
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="col-md-6">
                                <div class="card border-success">
                                    <div class="card-body text-center">
                                        <i class="fas fa-chart-line text-success mb-3" style="font-size: 3rem;"></i>
                                        <h5>تقرير الإحصائيات</h5>
                                        <p class="text-muted">تقرير تفصيلي للإحصائيات والرسوم البيانية</p>
                                        <button class="btn btn-success">
                                            <i class="fas fa-chart-bar me-2"></i>
                                            عرض الإحصائيات
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Practices by Type -->
                <div class="card">
                    <div class="card-header">
                        <h5 class="card-title mb-0">الممارسات حسب النوع</h5>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>نوع الممارسة</th>
                                        <th>عدد الممارسات</th>
                                        <th>إجمالي النقاط</th>
                                        <th>متوسط النقاط</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${generatePracticeTypeStats()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } else {
        // تقارير للأدوار الأخرى
        pageContent.innerHTML = `
            <div class="py-4">
                <h1 class="h3 mb-4">التقارير والإحصائيات</h1>
                <div class="card">
                    <div class="card-body text-center">
                        <h4>تقارير ${getRoleDisplayName(currentUser.role)}</h4>
                        <p class="text-muted">قريباً...</p>
                    </div>
                </div>
            </div>
        `;
    }
}

// تحميل صفحة التقرير النهائي
function loadFinalReport() {
    const pageContent = document.getElementById('pageContent');
    
    const totalPoints = practicesData.reduce((sum, p) => sum + p.points, 0);
    const totalHours = practicesData.reduce((sum, p) => sum + p.duration, 0);
    
    pageContent.innerHTML = `
        <div class="py-4">
            <!-- Header with Print Button -->
            <div class="d-flex justify-content-between align-items-center mb-4 no-print">
                <h1 class="h3 mb-0">التقرير النهائي للسجل</h1>
                <div>
                    <button class="btn btn-outline-secondary me-2" onclick="loadPage('reports')">
                        <i class="fas fa-arrow-right me-2"></i>
                        العودة للتقارير
                    </button>
                    <button class="btn btn-primary" onclick="window.print()">
                        <i class="fas fa-print me-2"></i>
                        طباعة التقرير
                    </button>
                </div>
            </div>

            <!-- Final Report Document -->
            <div class="final-report-document">
                <!-- Report Header -->
                <div class="report-header">
                    <div class="university-header">
                        <div class="logo-section">
                            <img src="logo.png" alt="شعار أثر" class="report-logo-left">
                        </div>
                        <div class="university-info">
                            <h2 class="university-name-ar">جامعة التقنية والعلوم التطبيقية</h2>
                            <h3 class="university-name-en">University of Technology and Applied Sciences</h3>
                        </div>
                        <div class="logo-section">
                            <img src="logo.png" alt="شعار الجامعة" class="report-logo-right">
                        </div>
                    </div>
                    
                    <div class="report-title-section">
                        <h1 class="report-main-title">سجل الطالب للممارسة المهنية (أثر)</h1>
                        <h2 class="report-subtitle">رحلة الإنجاز والتأثير</h2>
                    </div>
                </div>

                <!-- Student Information Table -->
                <div class="student-info-section">
                    <h3 class="section-title">معلومات الطالب</h3>
                    <table class="info-table">
                        <tr>
                            <td class="label-cell">اسم الطالب</td>
                            <td class="value-cell">${currentUser.name}</td>
                            <td class="label-cell">الكلية</td>
                            <td class="value-cell">${currentUser.college}</td>
                        </tr>
                        <tr>
                            <td class="label-cell">الرقم الجامعي</td>
                            <td class="value-cell">${currentUser.studentId}</td>
                            <td class="label-cell">التخصص</td>
                            <td class="value-cell">${currentUser.department}</td>
                        </tr>
                        <tr>
                            <td class="label-cell">المرشد الأكاديمي</td>
                            <td class="value-cell">د. محمد بن سالم الكندي</td>
                            <td class="label-cell">الرقم المدني</td>
                            <td class="value-cell">12345678</td>
                        </tr>
                    </table>
                </div>

                <!-- Training Section -->
                <div class="practices-section">
                    <h3 class="section-title">التدريب</h3>
                    <table class="practices-table">
                        <thead>
                            <tr>
                                <th>اسم المؤسسة</th>
                                <th>نوع التدريب</th>
                                <th>نمط المشاركة (حضوري/افتراضي)</th>
                                <th>مستوى المشاركة</th>
                                <th>الوقت (من/إلى)</th>
                                <th>التاريخ (من/إلى)</th>
                                <th>مجموع النقاط</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${generateTrainingRows()}
                        </tbody>
                    </table>
                </div>

                <!-- Field Visits Section -->
                <div class="practices-section">
                    <h3 class="section-title">الزيارات الميدانية</h3>
                    <table class="practices-table">
                        <thead>
                            <tr>
                                <th>اسم المؤسسة</th>
                                <th>هدف الزيارة</th>
                                <th>مدة الزيارة (ساعة/يوم)</th>
                                <th>الجهة المنظمة</th>
                                <th>مستوى المشاركة</th>
                                <th>الوقت (من/إلى)</th>
                                <th>التاريخ (من/إلى)</th>
                                <th>مجموع النقاط</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${generateFieldVisitsRows()}
                        </tbody>
                    </table>
                </div>

                <!-- Workshops and Seminars Section -->
                <div class="practices-section">
                    <h3 class="section-title">ورش العمل والندوات والمؤتمرات المهنية</h3>
                    <table class="practices-table">
                        <thead>
                            <tr>
                                <th>اسم المؤسسة</th>
                                <th>نمط التقديم (حضوري/افتراضي)</th>
                                <th>نمط المشاركة</th>
                                <th>الموضوع</th>
                                <th>الجهة المنظمة</th>
                                <th>مستوى المشاركة</th>
                                <th>الوقت (من/إلى)</th>
                                <th>التاريخ (من/إلى)</th>
                                <th>مجموع النقاط</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${generateWorkshopsRows()}
                        </tbody>
                    </table>
                </div>

                <!-- Report Footer -->
                <div class="report-footer">
                    <div class="footer-content">
                        <div class="signature-section">
                            <div class="signature-box">
                                <p>توقيع الطالب</p>
                                <div class="signature-line"></div>
                                <p class="signature-date">التاريخ: ${new Date().toLocaleDateString('ar-SA')}</p>
                            </div>
                            <div class="signature-box">
                                <p>توقيع المرشد الأكاديمي</p>
                                <div class="signature-line"></div>
                                <p class="signature-date">التاريخ: ___________</p>
                            </div>
                        </div>
                        
                        <div class="summary-section">
                            <div class="summary-box">
                                <h4>ملخص الإنجازات</h4>
                                <div class="summary-stats">
                                    <div class="stat-item">
                                        <span class="stat-label">إجمالي النقاط:</span>
                                        <span class="stat-value">${totalPoints}</span>
                                    </div>
                                    <div class="stat-item">
                                        <span class="stat-label">إجمالي الساعات:</span>
                                        <span class="stat-value">${totalHours}</span>
                                    </div>
                                    <div class="stat-item">
                                        <span class="stat-label">عدد الممارسات:</span>
                                        <span class="stat-value">${practicesData.length}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <style>
        @media print {
            .no-print { display: none !important; }
            body { font-size: 12px; }
            .final-report-document { margin: 0; padding: 0; }
        }

        .final-report-document {
            background: white;
            max-width: 210mm;
            margin: 0 auto;
            padding: 20mm;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            font-family: 'Cairo', sans-serif;
            line-height: 1.4;
        }

        .report-header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 3px solid var(--primary-color);
            padding-bottom: 20px;
        }

        .university-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 20px;
        }

        .report-logo-left, .report-logo-right {
            height: 80px;
            width: auto;
        }

        .university-info {
            text-align: center;
            flex: 1;
        }

        .university-name-ar {
            font-size: 24px;
            font-weight: bold;
            color: var(--primary-color);
            margin-bottom: 5px;
        }

        .university-name-en {
            font-size: 18px;
            color: var(--secondary-color);
            margin-bottom: 0;
        }

        .report-main-title {
            font-size: 28px;
            font-weight: bold;
            color: var(--primary-color);
            margin-bottom: 10px;
        }

        .report-subtitle {
            font-size: 20px;
            color: var(--secondary-color);
            margin-bottom: 0;
        }

        .section-title {
            background: var(--primary-color);
            color: white;
            padding: 10px 15px;
            margin: 25px 0 15px 0;
            font-size: 18px;
            font-weight: bold;
            border-radius: 5px;
        }

        .info-table, .practices-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
            font-size: 14px;
        }

        .info-table td, .practices-table th, .practices-table td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: center;
        }

        .info-table .label-cell {
            background-color: #f8f9fa;
            font-weight: bold;
            width: 25%;
        }

        .info-table .value-cell {
            width: 25%;
        }

        .practices-table th {
            background-color: var(--primary-color);
            color: white;
            font-weight: bold;
            font-size: 12px;
        }

        .practices-table tbody tr:nth-child(even) {
            background-color: #f8f9fa;
        }

        .report-footer {
            margin-top: 40px;
            border-top: 2px solid var(--primary-color);
            padding-top: 20px;
        }

        .signature-section {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
        }

        .signature-box {
            text-align: center;
            width: 45%;
        }

        .signature-line {
            border-bottom: 2px solid #333;
            margin: 20px 0 10px 0;
            height: 40px;
        }

        .signature-date {
            font-size: 12px;
            color: #666;
        }

        .summary-section {
            text-align: center;
        }

        .summary-box {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            border: 2px solid var(--primary-color);
        }

        .summary-box h4 {
            color: var(--primary-color);
            margin-bottom: 15px;
            font-size: 18px;
        }

        .summary-stats {
            display: flex;
            justify-content: space-around;
        }

        .stat-item {
            text-align: center;
        }

        .stat-label {
            display: block;
            font-weight: bold;
            color: #666;
            margin-bottom: 5px;
        }

        .stat-value {
            display: block;
            font-size: 24px;
            font-weight: bold;
            color: var(--primary-color);
        }
        </style>
    `;
}

// وظائف مساعدة لإنشاء صفوف الجداول
function generateTrainingRows() {
    const trainingPractices = practicesData.filter(p => 
        p.type === 'التدريب على رأس العمل' || p.type === 'التدريب الاختياري'
    );
    
    if (trainingPractices.length === 0) {
        return '<tr><td colspan="7" class="text-center text-muted">لا توجد ممارسات تدريبية</td></tr>';
    }
    
    return trainingPractices.map(practice => `
        <tr>
            <td>${practice.organization}</td>
            <td>${practice.type}</td>
            <td>${practice.participationType}</td>
            <td>${practice.participationLevel}</td>
            <td>${practice.duration} ساعة</td>
            <td>${new Date(practice.startDate).toLocaleDateString('ar-SA')} - ${new Date(practice.endDate).toLocaleDateString('ar-SA')}</td>
            <td><strong>${practice.points}</strong></td>
        </tr>
    `).join('');
}

function generateFieldVisitsRows() {
    const fieldVisits = practicesData.filter(p => p.type === 'الزيارات الميدانية');
    
    if (fieldVisits.length === 0) {
        return '<tr><td colspan="8" class="text-center text-muted">لا توجد زيارات ميدانية</td></tr>';
    }
    
    return fieldVisits.map(practice => `
        <tr>
            <td>${practice.organization}</td>
            <td>${practice.title}</td>
            <td>${practice.duration} ساعة</td>
            <td>${practice.organization}</td>
            <td>${practice.participationLevel}</td>
            <td>-</td>
            <td>${new Date(practice.startDate).toLocaleDateString('ar-SA')} - ${new Date(practice.endDate).toLocaleDateString('ar-SA')}</td>
            <td><strong>${practice.points}</strong></td>
        </tr>
    `).join('');
}

function generateWorkshopsRows() {
    const workshops = practicesData.filter(p => 
        p.type === 'ورش العمل والندوات' || 
        p.type === 'المؤتمرات المهنية' ||
        p.type === 'المسابقات والهاكاثونات'
    );
    
    if (workshops.length === 0) {
        return '<tr><td colspan="9" class="text-center text-muted">لا توجد ورش عمل أو ندوات</td></tr>';
    }
    
    return workshops.map(practice => `
        <tr>
            <td>${practice.organization}</td>
            <td>${practice.participationType}</td>
            <td>${practice.participationType}</td>
            <td>${practice.title}</td>
            <td>${practice.organization}</td>
            <td>${practice.participationLevel}</td>
            <td>${practice.duration} ساعة</td>
            <td>${new Date(practice.startDate).toLocaleDateString('ar-SA')} - ${new Date(practice.endDate).toLocaleDateString('ar-SA')}</td>
            <td><strong>${practice.points}</strong></td>
        </tr>
    `).join('');
}

// باقي الوظائف...
function generatePracticeTypeStats() {
    const typeStats = {};
    
    practicesData.forEach(practice => {
        if (!typeStats[practice.type]) {
            typeStats[practice.type] = {
                count: 0,
                totalPoints: 0
            };
        }
        typeStats[practice.type].count++;
        typeStats[practice.type].totalPoints += practice.points;
    });
    
    return Object.entries(typeStats).map(([type, stats]) => `
        <tr>
            <td>${type}</td>
            <td>${stats.count}</td>
            <td>${stats.totalPoints}</td>
            <td>${Math.round(stats.totalPoints / stats.count)}</td>
        </tr>
    `).join('');
}

function getRoleDisplayName(role) {
    const roleNames = {
        'student': 'الطالب',
        'reviewer': 'المراجع',
        'approver': 'المعتمد',
        'certifier': 'المصدق',
        'admin': 'المدير'
    };
    return roleNames[role] || role;
}

function loadPractices() {
    const pageContent = document.getElementById('pageContent');
    pageContent.innerHTML = `
        <div class="py-4">
            <h1 class="h3 mb-4">قائمة الممارسات المهنية</h1>
            <div class="card">
                <div class="card-body">
                    <p class="text-muted">قريباً...</p>
                </div>
            </div>
        </div>
    `;
}

function loadAddPractice() {
    const pageContent = document.getElementById('pageContent');
    pageContent.innerHTML = `
        <div class="py-4">
            <h1 class="h3 mb-4">إضافة ممارسة مهنية جديدة</h1>
            <div class="card">
                <div class="card-body">
                    <p class="text-muted">قريباً...</p>
                </div>
            </div>
        </div>
    `;
}

function loadSettings() {
    const pageContent = document.getElementById('pageContent');
    pageContent.innerHTML = `
        <div class="py-4">
            <h1 class="h3 mb-4">إعدادات النظام</h1>
            <div class="card">
                <div class="card-body">
                    <p class="text-muted">قريباً...</p>
                </div>
            </div>
        </div>
    `;
}

function loadProfile() {
    const pageContent = document.getElementById('pageContent');
    pageContent.innerHTML = `
        <div class="py-4">
            <h1 class="h3 mb-4">الملف الشخصي</h1>
            <div class="card">
                <div class="card-body">
                    <p class="text-muted">قريباً...</p>
                </div>
            </div>
        </div>
    `;
}

// وظيفة تسجيل الخروج
function setupLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            currentUser = null;
            showLandingPage();
        });
    }
}

// تهيئة التطبيق
document.addEventListener('DOMContentLoaded', function() {
    setupCopyButtons();
    setupPasswordToggle();
    setupLogin();
    setupLogout();
    
    // إضافة مستمعي الأحداث للتنقل في الشريط العلوي
    document.querySelectorAll('[data-page]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            loadPage(page);
        });
    });
});