import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '10mb' }));

  // In-memory data store pre-populated with active members
  const membersDB: Array<{
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    age: number;
    gender: string;
    country: string;
    city: string;
    region?: string;
    photo: string;
    gallery?: string[];
    bio: string;
    interests: string[];
    relationshipGoal: string;
    preferredAgeMin: number;
    preferredAgeMax: number;
    preferredLocation: string;
    languages: string[];
    lifestyle: string;
    familyStatus: string;
    isVerified: boolean;
    isOnline: boolean;
    lastActive: string;
    memberSince: string;
  }> = [
    {
      id: 'user-ketevan-62',
      firstName: 'ქეთევან',
      lastName: 'ერისთავი',
      email: 'ketevan.eristavi@goldage.ge',
      phone: '599 11 22 33',
      age: 62,
      gender: 'ქალი',
      country: 'საქართველო',
      city: 'თბილისი',
      region: 'მთაწმინდა-სოლოლაკი',
      photo: '/src/assets/images/portrait_ketevan_1792476836823.jpg',
      bio: 'მშვიდი, კეთილგანწყობილი და თბილი ქალი ვარ. მიყვარს ბოტანიკურ ბაღში სეირნობა, კლასიკური მუსიკა და გულწრფელი საუბრები.',
      interests: ['ბოტანიკური ბაღი', 'კლასიკური მუსიკა', 'თეატრი', 'კულინარია'],
      relationshipGoal: 'ქორწინება',
      preferredAgeMin: 58,
      preferredAgeMax: 72,
      preferredLocation: 'თბილისი',
      languages: ['ქართული', 'რუსული'],
      lifestyle: 'დილის სეირნობა, მყუდრო საღამოები',
      familyStatus: 'ქვრივი',
      isVerified: true,
      isOnline: true,
      lastActive: 'ახლახან',
      memberSince: '2026',
    },
    {
      id: 'user-marina-59',
      firstName: 'მარინა',
      lastName: 'ბარათაშვილი',
      email: 'marina.baratashvili@goldage.ge',
      phone: '597 22 33 44',
      age: 59,
      gender: 'ქალი',
      country: 'საქართველო',
      city: 'თბილისი',
      region: 'ძველი თბილისი',
      photo: '/src/assets/images/portrait_marina_1792476837054.jpg',
      bio: 'ღიმილიანი და სიცოცხლით სავსე ადამიანი ვარ. მიყვარს ძველი თბილისის მყუდრო კაფეებში ყავის დალევა, ხელოვნება და ფერწერა.',
      interests: ['ხელოვნება', 'ძველი თბილისი', 'მოგზაურობა', 'ყავა'],
      relationshipGoal: 'სერიოზული ურთიერთობა',
      preferredAgeMin: 55,
      preferredAgeMax: 68,
      preferredLocation: 'თბილისი',
      languages: ['ქართული', 'იტალიური'],
      lifestyle: 'კაფეში საუბრები, საღამოს გასეირნება',
      familyStatus: 'განქორწინებული',
      isVerified: true,
      isOnline: true,
      lastActive: 'ახლახან',
      memberSince: '2026',
    },
    {
      id: 'user-tamar-56',
      firstName: 'თამარ',
      lastName: 'კობახიძე',
      email: 'tamar.kobakhidze@goldage.ge',
      phone: '599 34 56 78',
      age: 56,
      gender: 'ქალი',
      country: 'საქართველო',
      city: 'ქუთაისი',
      region: 'იმერეთი',
      photo: '/src/assets/images/portrait_tamar_1792476838335.jpg',
      bio: 'ჩვეულებრივი, ძალიან თბილი და ოჯახური სითბოს მოყვარული ადამიანი. მიყვარს ქართული ტრადიციული სამზარეულო და ყვავილები.',
      interests: ['კულინარია', 'ოჯახური სითბო', 'ყვავილები', 'სიმშვიდე'],
      relationshipGoal: 'ქორწინება',
      preferredAgeMin: 52,
      preferredAgeMax: 66,
      preferredLocation: 'ქუთაისი ან თბილისი',
      languages: ['ქართული'],
      lifestyle: 'მყუდრო სამზარეულო, სტუმართმოყვარეობა',
      familyStatus: 'ქვრივი',
      isVerified: true,
      isOnline: true,
      lastActive: 'ახლახან',
      memberSince: '2026',
    },
    {
      id: 'user-natela-63',
      firstName: 'ნათელა',
      lastName: 'დოლიძე',
      email: 'natela.dolidze@goldage.ge',
      phone: '555 45 67 89',
      age: 63,
      gender: 'ქალი',
      country: 'საქართველო',
      city: 'თბილისი',
      region: 'მთაწმინდა',
      photo: '/src/assets/images/portrait_natela_1792476838981.jpg',
      bio: 'პროფესიით პედაგოგი ვარ. მიყვარს მთაწმინდის პარკში სეირნობა, შემოდგომის ფერები, წიგნების კითხვა და თეატრი.',
      interests: ['მთაწმინდა', 'ლიტერატურა', 'თეატრი', 'სეირნობა'],
      relationshipGoal: 'სერიოზული ურთიერთობა',
      preferredAgeMin: 58,
      preferredAgeMax: 72,
      preferredLocation: 'თბილისი',
      languages: ['ქართული', 'რუსული'],
      lifestyle: 'პარკში გასეირნება, საღამოს კითხვა',
      familyStatus: 'ქვრივი',
      isVerified: true,
      isOnline: true,
      lastActive: 'ახლახან',
      memberSince: '2026',
    },
    {
      id: 'user-ia-58',
      firstName: 'ია',
      lastName: 'ხუციშვილი',
      email: 'ia.khutsishvili@goldage.ge',
      phone: '591 23 45 67',
      age: 58,
      gender: 'ქალი',
      country: 'საქართველო',
      city: 'რუსთავი',
      region: 'ქვემო ქართლი',
      photo: '/src/assets/images/portrait_ia_1792476839439.jpg',
      bio: 'მშვიდი, გაწონასწორებული და ყურადღებიანი ქალი ვარ. მიყვარს წიგნები, მყუდრო სახლი, მცენარეების მოვლა.',
      interests: ['წიგნები', 'მცენარეები', 'მყუდროება', 'მუსიკა'],
      relationshipGoal: 'სერიოზული ურთიერთობა',
      preferredAgeMin: 54,
      preferredAgeMax: 68,
      preferredLocation: 'რუსთავი ან თბილისი',
      languages: ['ქართული', 'რუსული'],
      lifestyle: 'კითხვა, აივანზე ჩაის დალევა',
      familyStatus: 'განქორწინებული',
      isVerified: true,
      isOnline: true,
      lastActive: 'ახლახან',
      memberSince: '2026',
    },
    {
      id: 'user-elene-52',
      firstName: 'ელენე',
      lastName: 'კალანდაძე',
      email: 'elene.kalandadze@goldage.ge',
      phone: '599 14 25 36',
      age: 52,
      gender: 'ქალი',
      country: 'საქართველო',
      city: 'თბილისი',
      region: 'ვაკე',
      photo: '/src/assets/images/portrait_elene_1792476839964.jpg',
      bio: 'თბილი, პოზიტიური და კომუნიკაბელური ქალბატონი. მიყვარს ყვავილები, მყუდრო ეზო, დილის ყავა და გულწრფელი ადამიანები.',
      interests: ['ყვავილები', 'ბაღი', 'კულინარია', 'მუსიკა'],
      relationshipGoal: 'სერიოზული ურთიერთობა',
      preferredAgeMin: 50,
      preferredAgeMax: 64,
      preferredLocation: 'თბილისი ან შემოგარენი',
      languages: ['ქართული', 'რუსული'],
      lifestyle: 'დილის ყავა ეზოში, ყვავილების მოვლა',
      familyStatus: 'განქორწინებული',
      isVerified: true,
      isOnline: true,
      lastActive: 'ახლახან',
      memberSince: '2026',
    },
    {
      id: 'user-keti-50',
      firstName: 'ქეთი',
      lastName: 'ჭელიძე',
      email: 'keti.chelidze@goldage.ge',
      phone: '577 92 34 51',
      age: 50,
      gender: 'ქალი',
      country: 'საქართველო',
      city: 'ბათუმი',
      region: 'აჭარა',
      photo: '/src/assets/images/portrait_keti_1792476841079.jpg',
      bio: 'ვცხოვრობ ბათუმში. მიყვარს ზღვა, საღამოს ბულვარზე ფეხით სეირნობა, მზის ჩასვლა და ზღვის ტალღების ხმა.',
      interests: ['ზღვა', 'ბათუმის ბულვარი', 'მზის ჩასვლა', 'მოგზაურობა'],
      relationshipGoal: 'სერიოზული ურთიერთობა',
      preferredAgeMin: 48,
      preferredAgeMax: 62,
      preferredLocation: 'ბათუმი ან დასავლეთ საქართველო',
      languages: ['ქართული', 'ინგლისური'],
      lifestyle: 'აქტიური, ჯანსაღი, ზღვისპირა გასეირნება',
      familyStatus: 'დასაოჯახებელი',
      isVerified: true,
      isOnline: true,
      lastActive: 'ახლახან',
      memberSince: '2026',
    },
    {
      id: 'user-nino-56',
      firstName: 'ნინო',
      lastName: 'ასათიანი',
      email: 'nino.asatiani@goldage.ge',
      phone: '598 76 54 32',
      age: 56,
      gender: 'ქალი',
      country: 'საქართველო',
      city: 'გორი',
      region: 'შიდა ქართლი',
      photo: '/src/assets/images/portrait_nino_1792476840763.jpg',
      bio: 'ბიბლიოთეკარი ვარ. მშვიდი, კეთილი და ოჯახური სითბოს მოყვარული ადამიანი. მიყვარს წიგნები, მცენარეების მოვლა.',
      interests: ['წიგნები', 'მებაღეობა', 'კულინარია', 'მშვიდი საუბრები'],
      relationshipGoal: 'ქორწინება',
      preferredAgeMin: 52,
      preferredAgeMax: 66,
      preferredLocation: 'გორი ან თბილისი',
      languages: ['ქართული', 'რუსული'],
      lifestyle: 'მშვიდი ცხოვრება, მყუდრო სახლი',
      familyStatus: 'განქორწინებული',
      isVerified: true,
      isOnline: true,
      lastActive: 'ახლახან',
      memberSince: '2026',
    },
    {
      id: 'user-nana-63',
      firstName: 'ნანა',
      lastName: 'ჩხეიძე',
      email: 'nana.chkheidze@goldage.ge',
      phone: '599 82 71 60',
      age: 63,
      gender: 'ქალი',
      country: 'საქართველო',
      city: 'თბილისი',
      region: 'საბურთალო',
      photo: '/src/assets/images/portrait_nana_1792476841368.jpg',
      bio: 'ენერგიული, მხიარული და პოზიტიური ქალბატონი. მიყვარს რიყის პარკში გასეირნება, ოპერა, მეგობრებთან შეხვედრა და გემრიელი ჩაი.',
      interests: ['რიყის პარკი', 'ოპერა', 'თეატრი', 'სეირნობა'],
      relationshipGoal: 'ქორწინება',
      preferredAgeMin: 60,
      preferredAgeMax: 74,
      preferredLocation: 'თბილისი',
      languages: ['ქართული', 'რუსული'],
      lifestyle: 'სეირნობა პარკში, თბილი საუბრები',
      familyStatus: 'ქვრივი',
      isVerified: true,
      isOnline: true,
      lastActive: 'ახლახან',
      memberSince: '2026',
    },
    {
      id: 'user-lali-58',
      firstName: 'ლალი',
      lastName: 'ღვინიაშვილი',
      email: 'lali.ghviniashvili@goldage.ge',
      phone: '593 55 66 77',
      age: 58,
      gender: 'ქალი',
      country: 'საქართველო',
      city: 'თბილისი',
      region: 'მთაწმინდა',
      photo: '/src/assets/images/portrait_lali_1792476842567.jpg',
      bio: 'მუსიკის პედაგოგი. ვცხოვრობ ძველ თბილისში. მიყვარს ხელოვნების მუზეუმები, გამოფენები და კლასიკური კონცერტები.',
      interests: ['კლასიკური მუსიკა', 'მუზეუმები', 'ხელოვნება'],
      relationshipGoal: 'სერიოზული ურთიერთობა',
      preferredAgeMin: 55,
      preferredAgeMax: 68,
      preferredLocation: 'თბილისი',
      languages: ['ქართული', 'იტალიური'],
      lifestyle: 'კულტურული ცხოვრება, დილის ყავა',
      familyStatus: 'განქორწინებული',
      isVerified: true,
      isOnline: true,
      lastActive: 'ახლახან',
      memberSince: '2026',
    },
    {
      id: 'user-eter-65',
      firstName: 'ეთერ',
      lastName: 'აბაშიძე',
      email: 'eter.abashidze@goldage.ge',
      phone: '598 88 99 00',
      age: 65,
      gender: 'ქალი',
      country: 'საქართველო',
      city: 'ბორჯომი',
      region: 'სამცხე-ჯავახეთი',
      photo: '/src/assets/images/portrait_eter_1792476843178.jpg',
      bio: 'ვცხოვრობ ბორჯომის ხეობაში. მიყვარს ყვავილების ბაღის მოვლა, სამკურნალო მცენარეები და მყუდრო სახლი.',
      interests: ['ყვავილები', 'ბორჯომის ხეობა', 'მებაღეობა'],
      relationshipGoal: 'ქორწინება',
      preferredAgeMin: 60,
      preferredAgeMax: 74,
      preferredLocation: 'ბორჯომი ან თბილისი',
      languages: ['ქართული'],
      lifestyle: 'ყვავილების მოვლა ეზოში, მთის ჰაერი',
      familyStatus: 'ქვრივი',
      isVerified: true,
      isOnline: true,
      lastActive: 'ახლახან',
      memberSince: '2026',
    },
    {
      id: 'user-manana-64',
      firstName: 'მანანა',
      lastName: 'ცინცაძე',
      email: 'manana.tsintsadze@goldage.ge',
      phone: '595 12 34 56',
      age: 64,
      gender: 'ქალი',
      country: 'საქართველო',
      city: 'თბილისი',
      region: 'ავლაბარი',
      photo: '/src/assets/images/portrait_manana_1792476843232.jpg',
      bio: 'სიცოცხლისმოყვარული, გულთბილი ქალბატონი. მიყვარს მტკვრის ხედით ვერანდაზე ჩაის დალევა და ოჯახური სითბო.',
      interests: ['ვერანდა', 'ჩაი', 'კულინარია', 'სტუმართმოყვარეობა'],
      relationshipGoal: 'ქორწინება',
      preferredAgeMin: 60,
      preferredAgeMax: 72,
      preferredLocation: 'თბილისი',
      languages: ['ქართული', 'რუსული'],
      lifestyle: 'ვერანდაზე ჩაის დალევა, ოჯახური სითბო',
      familyStatus: 'ქვრივი',
      isVerified: true,
      isOnline: true,
      lastActive: 'ახლახან',
      memberSince: '2026',
    },
  ];

  // Messages database: memberId -> list of messages
  const messagesDB: Record<string, Array<{ id: string; sender: 'me' | 'them'; text: string; time: string }>> = {};

  // Favorites set
  const favoritesDB = new Set<string>();

  // REST API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'GoldAge Backend API', timestamp: new Date().toISOString() });
  });

  // Get members with optional filtering
  app.get('/api/members', (req, res) => {
    const { gender, city, minAge, maxAge, query } = req.query;

    let filtered = [...membersDB];

    if (gender && gender !== 'ყველა') {
      filtered = filtered.filter(m => m.gender === gender);
    }
    if (city && city !== 'ყველა') {
      filtered = filtered.filter(m => m.city.toLowerCase().includes((city as string).toLowerCase()));
    }
    if (minAge) {
      filtered = filtered.filter(m => m.age >= Number(minAge));
    }
    if (maxAge) {
      filtered = filtered.filter(m => m.age <= Number(maxAge));
    }
    if (query) {
      const q = (query as string).toLowerCase();
      filtered = filtered.filter(m =>
        m.firstName.toLowerCase().includes(q) ||
        m.lastName.toLowerCase().includes(q) ||
        m.city.toLowerCase().includes(q) ||
        m.bio.toLowerCase().includes(q) ||
        m.interests.some(i => i.toLowerCase().includes(q))
      );
    }

    res.json({ success: true, count: filtered.length, data: filtered });
  });

  // Seed / Sync initial members from client if server DB is empty
  app.post('/api/members/sync', (req, res) => {
    const { members } = req.body;
    if (Array.isArray(members) && membersDB.length === 0) {
      members.forEach(m => membersDB.push(m));
      return res.json({ success: true, count: membersDB.length });
    }
    res.json({ success: true, count: membersDB.length });
  });

  // Get specific member
  app.get('/api/members/:id', (req, res) => {
    const member = membersDB.find(m => m.id === req.params.id);
    if (!member) {
      return res.status(404).json({ success: false, error: 'Member not found' });
    }
    res.json({ success: true, data: member });
  });

  // Register user endpoint
  app.post('/api/auth/register', (req, res) => {
    const { firstName, lastName, phone, email, age, gender, city, relationshipGoal, familyStatus, bio, photo } = req.body;

    if (!firstName || !firstName.trim()) {
      return res.status(400).json({ success: false, error: 'სახელი აუცილებელია' });
    }

    const newId = `user-${Date.now()}`;
    const newMember = {
      id: newId,
      firstName: firstName.trim(),
      lastName: lastName ? lastName.trim() : '',
      email: email || `${newId}@goldage.ge`,
      phone: phone || '',
      age: Number(age) || 60,
      gender: gender || 'ქალი',
      country: 'საქართველო',
      city: city || 'თბილისი',
      photo: photo || '/src/assets/images/portrait_elene_1792476839964.jpg',
      gallery: photo ? [photo] : [],
      bio: bio ? bio.trim() : 'ახალი წევრი GoldAge-ზე',
      interests: ['გაცნობა', 'საუბარი', 'სეირნობა'],
      relationshipGoal: relationshipGoal || 'ქორწინება',
      preferredAgeMin: Math.max(50, (Number(age) || 60) - 5),
      preferredAgeMax: Math.min(85, (Number(age) || 60) + 10),
      preferredLocation: city || 'თბილისი',
      languages: ['ქართული'],
      lifestyle: 'მშვიდი ცხოვრება',
      familyStatus: familyStatus || 'დასაოჯახებელი',
      isVerified: true,
      isOnline: true,
      lastActive: 'ახლახან',
      memberSince: '2026',
    };

    membersDB.unshift(newMember);

    res.json({
      success: true,
      user: newMember,
      token: `auth-token-${Date.now()}`,
    });
  });

  // Login endpoint
  app.post('/api/auth/login', (req, res) => {
    const { identifier } = req.body;
    if (!identifier || !identifier.trim()) {
      return res.status(400).json({ success: false, error: 'ტელეფონის ნომერი ან ელ-ფოსტა აუცილებელია' });
    }

    const clean = identifier.trim().toLowerCase();
    const found = membersDB.find(m =>
      (m.email && m.email.toLowerCase() === clean) ||
      (m.phone && m.phone.replace(/\s+/g, '') === clean.replace(/\s+/g, ''))
    );

    if (found) {
      return res.json({ success: true, user: found, token: `auth-token-${Date.now()}` });
    }

    // Default mock user for testing if no exact match
    const demoUser = membersDB[0] || {
      id: 'demo-user',
      firstName: 'მომხმარებელი',
      lastName: '',
      email: clean.includes('@') ? clean : `${clean}@goldage.ge`,
      phone: clean,
      age: 62,
      gender: 'ქალი',
      country: 'საქართველო',
      city: 'თბილისი',
      photo: '/src/assets/images/portrait_elene_1792476839964.jpg',
      isVerified: true,
      isOnline: true,
    };

    res.json({ success: true, user: demoUser, token: `auth-token-${Date.now()}` });
  });

  // Toggle favorite
  app.post('/api/favorites/toggle', (req, res) => {
    const { memberId } = req.body;
    if (!memberId) {
      return res.status(400).json({ success: false, error: 'memberId is required' });
    }

    if (favoritesDB.has(memberId)) {
      favoritesDB.delete(memberId);
      res.json({ success: true, isFavorite: false, favorites: Array.from(favoritesDB) });
    } else {
      favoritesDB.add(memberId);
      res.json({ success: true, isFavorite: true, favorites: Array.from(favoritesDB) });
    }
  });

  // Get favorites
  app.get('/api/favorites', (req, res) => {
    res.json({ success: true, favorites: Array.from(favoritesDB) });
  });

  // Messages endpoints
  app.get('/api/messages/:memberId', (req, res) => {
    const { memberId } = req.params;
    const thread = messagesDB[memberId] || [];
    res.json({ success: true, data: thread });
  });

  app.post('/api/messages/:memberId', (req, res) => {
    const { memberId } = req.params;
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ success: false, error: 'შეტყობინების ტექსტი ცარიელია' });
    }

    if (!messagesDB[memberId]) {
      messagesDB[memberId] = [];
    }

    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: 'me' as const,
      text: text.trim(),
      time: new Date().toLocaleTimeString('ka-GE', { hour: '2-digit', minute: '2-digit' }),
    };

    messagesDB[memberId].push(newMsg);

    res.json({ success: true, message: newMsg });
  });

  // Vite middleware mounting in development
  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true, port: 3000, host: '0.0.0.0' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 GoldAge Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
