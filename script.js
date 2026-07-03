document.addEventListener('DOMContentLoaded', () => {

    // 1. Scroll Progress Bar & Header Scroll Event
    const header = document.getElementById('header');
    const progressBar = document.getElementById('scroll-progress');
    
    window.addEventListener('scroll', () => {
        // Scroll Progress
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';

        // Header active class
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Mouse Tracking Spotlight Effect
    const mouseSpot = document.getElementById('mouse-spot');
    window.addEventListener('mousemove', (e) => {
        // Update CSS Variables for spotlight
        document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
        document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    });

    // 3. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link, .cta-btn-nav');

    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        mobileMenuBtn.classList.toggle('active');
        
        // Hamburguer animation
        const spans = mobileMenuBtn.querySelectorAll('span');
        if (navMenu.classList.contains('open')) {
            spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            mobileMenuBtn.classList.remove('active');
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // 4. Scroll Reveal Animation (Intersection Observer with 3D effects)
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // 5. Interactive Smartphone Mockup Control (App Demo)
    const mockupScreenBody = document.getElementById('mockup-screen-body');
    const mockupTabBtns = document.querySelectorAll('.mockup-tab-btn');

    const appScreens = {
        rank: `
            <div style="text-align:center; font-weight:700; font-family:var(--font-serif); color:var(--primary-gold); margin-bottom:0.8rem; font-size:1.1rem;">
                🔥 실시간 FLEX 랭킹
            </div>
            <p style="font-size:0.75rem; color:#888; text-align:center; margin-bottom:1rem;">현재 매장 내 결제 순위</p>
            
            <div class="mockup-rank-item top-rank">
                <div style="display:flex; align-items:center; gap:0.5rem;">
                    <span style="font-weight:700; color:var(--primary-gold);">1위</span>
                    <span>독주_4번테이블</span>
                    <span style="font-size:0.65rem; background:var(--primary-gold); color:#000; padding:0.1rem 0.3rem; border-radius:3px; font-weight:700;">VIP</span>
                </div>
                <span style="font-weight:700; color:var(--primary-gold);">540,000원</span>
            </div>
            
            <div class="mockup-rank-item top-rank">
                <div style="display:flex; align-items:center; gap:0.5rem;">
                    <span style="font-weight:700; color:var(--primary-gold);">2위</span>
                    <span>독주_7번테이블</span>
                    <span style="font-size:0.65rem; background:var(--primary-gold); color:#000; padding:0.1rem 0.3rem; border-radius:3px; font-weight:700;">VIP</span>
                </div>
                <span style="font-weight:700; color:var(--primary-gold);">320,000원</span>
            </div>

            <div class="mockup-rank-item">
                <div style="display:flex; align-items:center; gap:0.5rem;">
                    <span style="font-weight:700; color:#888;">3위</span>
                    <span>독주_2번테이블</span>
                </div>
                <span style="font-weight:700; color:#eee;">68,000원</span>
            </div>

            <p style="font-size:0.7rem; color:#666; text-align:center; margin-top:1.5rem; line-height:1.5;">
                * 랭킹 전광판에 테이블이 실시간 롤링 노출되어 남성 단골층의 승부욕과 결제 욕구를 고조시킵니다.
            </p>
        `,
        chat: `
            <div style="display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid rgba(255,255,255,0.05); padding-bottom:0.5rem; margin-bottom:0.8rem;">
                <span style="font-weight:700; color:var(--primary-gold);"><i class="fa-solid fa-comments"></i> 귓속말 (익명)</span>
                <span style="font-size:0.7rem; color:#22c55e;"><i class="fa-solid fa-circle"></i> 대화 해제</span>
            </div>
            
            <div style="display:flex; flex-direction:column; gap:0.8rem; overflow-y:auto; max-height:280px; padding:0.2rem;">
                <div class="chat-bubble chat-left">
                    안녕하세요! 음악 신청곡 혹시 어떤 거 하셨나요?
                </div>
                <div class="chat-bubble chat-left">
                    저희 맥캘란 1병 더 주문해서 귓속말 활성화 풀렸어요! ㅎㅎ
                </div>
                <div class="chat-bubble chat-right">
                    앗 고마워요! 선물로 하이볼 1잔 보냈습니다!
                </div>
                <div style="font-size:0.7rem; color:var(--primary-gold); text-align:center; margin:0.4rem 0; font-weight:600; background:rgba(212,175,55,0.05); padding:0.3rem; border-radius:5px;">
                    📢 4번 테이블님이 3번 테이블님에게 '산토리 하이볼'을 선물했습니다!
                </div>
            </div>
        `,
        admin: `
            <div style="text-align:center; font-weight:700; color:var(--primary-gold); margin-bottom:0.8rem; font-size:1.1rem; font-family:var(--font-serif);">
                🛠️ 바텐더 전용 대시보드
            </div>
            <p style="font-size:0.75rem; color:#888; text-align:center; margin-bottom:1rem;">실시간 테이블 분석 및 통제</p>

            <div style="font-size:0.8rem; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); padding:0.6rem; border-radius:6px; margin-bottom:0.6rem;">
                <div style="display:flex; justify-content:space-between; font-weight:700; margin-bottom:0.3rem;">
                    <span>T4번 테이블 (남2)</span>
                    <span style="color:var(--primary-gold);">누적 54만</span>
                </div>
                <div style="display:flex; justify-content:space-between; font-size:0.75rem; color:#aaa;">
                    <span>주문주종: 맥캘란 12Y (보틀)</span>
                    <span style="color:#ef4444; font-weight:600;">★ VIP 케어</span>
                </div>
            </div>

            <div style="font-size:0.8rem; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); padding:0.6rem; border-radius:6px; margin-bottom:0.6rem;">
                <div style="display:flex; justify-content:space-between; font-weight:700; margin-bottom:0.3rem;">
                    <span>T7번 테이블 (여2)</span>
                    <span style="color:var(--primary-gold);">누적 32만</span>
                </div>
                <div style="display:flex; justify-content:space-between; font-size:0.75rem; color:#aaa;">
                    <span>주문주종: 발베니 12Y (보틀)</span>
                    <span style="color:#22c55e;">대화 참여중</span>
                </div>
            </div>

            <div style="display:flex; gap:0.4rem; margin-top:1rem;">
                <button style="flex:1; background:#ef4444; border:none; border-radius:4px; color:#fff; padding:0.4rem; font-size:0.7rem; font-weight:700; cursor:pointer;">세션 강제 Kick</button>
                <button style="flex:1; background:var(--primary-gold); border:none; border-radius:4px; color:#000; padding:0.4rem; font-size:0.7rem; font-weight:700; cursor:pointer;">서비스 전송</button>
            </div>
        `
    };

    // Load Default Screen (Rank)
    mockupScreenBody.innerHTML = appScreens.rank;

    // Tab buttons click handler
    mockupTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active classes
            mockupTabBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class
            btn.classList.add('active');
            
            // Load content
            const screenName = btn.getAttribute('data-screen');
            mockupScreenBody.innerHTML = appScreens[screenName];
            
            // Update mobile footer icon highlights
            const footerIcons = document.querySelectorAll('.phone-footer i');
            footerIcons.forEach(i => i.parentElement.style.color = '#666');
            if (screenName === 'rank') {
                footerIcons[0].parentElement.style.color = 'var(--primary-gold)';
            } else if (screenName === 'chat') {
                footerIcons[1].parentElement.style.color = 'var(--primary-gold)';
            } else if (screenName === 'admin') {
                footerIcons[2].parentElement.style.color = 'var(--primary-gold)';
            }
        });
    });

    // 6. Interactive Investment Calculator (Low Cost 10-Pyeong Model)
    const inputInv = document.getElementById('initial-investment');
    const inputRev = document.getElementById('monthly-revenue');
    const inputMargin = document.getElementById('margin-rate');

    const displayInv = document.getElementById('inv-display');
    const displayRev = document.getElementById('rev-display');
    const displayMargin = document.getElementById('margin-display');

    const resultMaterial = document.getElementById('cost-material');
    const resultFixed = document.getElementById('cost-fixed');
    const resultNetProfit = document.getElementById('net-profit');
    const resultPayback = document.getElementById('payback-period');

    function formatNumber(num) {
        return Math.round(num).toLocaleString('ko-KR');
    }

    function calculateFinancials() {
        const inv = parseFloat(inputInv.value); // 만원
        const rev = parseFloat(inputRev.value); // 만원
        const margin = parseFloat(inputMargin.value); // %

        // 1) 원재료비 계산 (원가율 = 100 - 마진율)
        const costMat = rev * (1 - margin / 100);

        // 2) 10평 초가성비 혼술바 고정비 계산 모델
        // 골목상권 10평 상가 평균 임대료 120만 + 피크 보조 파트타임 알바 100만 + 공과금 및 기본 운영잡비 60만
        // 매출의 5% 상당의 수도광열 변동비 및 카드사 수수료 반영
        const costFix = 280 + (rev * 0.05);

        // 3) 월 예상 순수익 (점주 순수입)
        const netProfit = rev - costMat - costFix;

        // 4) 회수 기간 (개월)
        let paybackText = '';
        if (netProfit <= 0) {
            paybackText = '회수 불가 (적자)';
            resultPayback.style.color = '#EF4444';
        } else {
            const paybackMonths = inv / netProfit;
            paybackText = `약 ${paybackMonths.toFixed(1)}개월`;
            resultPayback.style.color = 'var(--primary-gold)';
        }

        // 값 업데이트
        displayInv.textContent = `${formatNumber(inv)}만`;
        displayRev.textContent = `${formatNumber(rev)}만`;
        displayMargin.textContent = `${margin}%`;

        resultMaterial.textContent = `${formatNumber(costMat)}만 원`;
        resultFixed.textContent = `${formatNumber(costFix)}만 원`;
        resultNetProfit.textContent = `${formatNumber(netProfit)}만 원`;
        resultPayback.textContent = paybackText;
    }

    // Event Listeners for inputs
    [inputInv, inputRev, inputMargin].forEach(input => {
        input.addEventListener('input', calculateFinancials);
    });

    // Initial Calculation
    calculateFinancials();

    // 7. Inquiry Form Submission Interaction
    const partnerForm = document.getElementById('partner-form');
    const toast = document.getElementById('toast');

    partnerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Simulate form submission
        const name = document.getElementById('user-name').value;
        const phone = document.getElementById('user-phone').value;
        const email = document.getElementById('user-email').value;
        const budget = document.getElementById('invest-budget').value;
        const message = document.getElementById('user-message').value;

        console.log('Inquiry submitted:', { name, phone, email, budget, message });

        // Show Toast Notification
        toast.classList.add('show');

        // Reset Form
        partnerForm.reset();

        // Hide Toast after 4 seconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    });

    // Active Navigation Highlight on Scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});
