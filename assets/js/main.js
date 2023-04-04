$(function(){
    /**
     * - 상단으로로 이동 버튼
     * : 클릭 시, 최상단으로 이동
     * 
     * @userScroll : 사용자 스크롤양을 받아오는 변수
     */
    $(window).scroll(function(){
        const userScroll = $(this).scrollTop();
        if ( userScroll === 0 ) {
            $('.btn-top').removeClass('on');
        } else {
            $('.btn-top').addClass('on');
        }
    });
    $('.btn-top').click(function(){
        $('html,body').animate({scrollTop:0},300)
    });

    /**
     * - 언어선택
     * : 버튼 클릭 시, 새 창 열기
     *  @url : 셀렉트의 밸류값
     */
    $('#langBtn').click(function(){
        const url = $('#langList').val();
        window.open(url);
    });

    // 탭뉴스 스와이퍼
    const tabSlide = new Swiper(".sc-tabnews .group-slide", {
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".pagination",
            type: "fraction",
        },
        navigation: {
            nextEl: ".btn-arrow.next",
            prevEl: ".btn-arrow.prev",
        },
        loop: true
    });

    /**
     * - 탭뉴스 스와이퍼
     * : 메뉴 선택하면 해당 슬라이드로 이동
     * @idx = 내가 선택한 메뉴의 data-index 속성 값을 저장하는 변수
    */
    $('.sc-tabnews .btn-menu').click(function(){
        const idx = $(this).data('index');
        tabSlide.slideToLoop(idx);
    });

    /*
    * - 탭뉴스 스와이퍼 버튼 스타일
    * : n번째 슬라이드 나오면 해당 tabSlide 메뉴 스타일 적용
    */
    tabSlide.on('slideChange', function(){
        console.log('realIndex:'+ this.realIndex);
        if ( this.realIndex > 3 ) {
            $('.sc-tabnews .citizen').attr('aria-selected','true');
            $('.sc-tabnews .news').attr('aria-selected','false');
        } else {
            $('.sc-tabnews .news').attr('aria-selected','true');
            $('.sc-tabnews .citizen').attr('aria-selected','false');
        }
    });

    // - 탭뉴스 스와이퍼 자동 재생 버튼
    $('.sc-tabnews .btn-autoplay').click(function(){
        if ( $(this).hasClass('on') ) {
            tabSlide.autoplay.start();
            $(this).removeClass('on');
            $(this).children('.blind').text('자동재생 정지');
        } else {
            tabSlide.autoplay.stop();
            $(this).addClass('on');
            $(this).children('.blind').text('자동재생 적용');
        }
    });
    
    // 배너 스와이퍼
    const bannerSlide = new Swiper(".sc-banner", {
        speed: 500,
        slidesPerView: 3,
        spaceBetween: 43,
        autoplay: {
            delay: 1000,
            disableOnInteraction: false,    //내가 컨트롤해도 autoplay 유지
        },
        pagination: {
            el: ".pagination",
            type: "fraction",
        },
        navigation: {
            nextEl: ".btn-arrow.next",
            prevEl: ".btn-arrow.prev",
        },
        loop: true,
    });

    /** 
     * - 배너 스와이퍼 자동재생 버튼
     * @on 붙은 상태가 자동재생 멈춤 상태
    */
    $('.sc-banner .btn-autoplay').click(function(){
        if ( $(this).hasClass('on') ) {
            bannerSlide.autoplay.start();
            $(this).children('.blind').text('자동재생 정지');
        } else {
            bannerSlide.autoplay.stop();
            $(this).children('.blind').text('자동재생 적용');
        }
    });

    /** 
     * - 관련 링크 영역 
     * : 버튼 클릭 시 메뉴 올라오고 내려옴
     * 
    */
    $('.sc-related .btn-related').click(function(e){
        if  (!$(this).hasClass('none')) {
            e.preventDefault();

            if ( $(this).hasClass('on') ) {
                $('.sc-related .sub').stop().slideUp(200);
                $('.sc-related .btn-related').removeClass('on');
            } else {
                $('.sc-related .sub').stop().slideUp(200);
                $(this).siblings('.sub').stop().slideDown(200);

                $('.sc-related .btn-related').removeClass('on');
                $(this).addClass('on');
            }
        }
    });

    // - 관련 링크 영역 키보드 접근
    $('.sc-related .sub-list .sub-item:first-child').keydown(function(e){
        if ( e.keyCode === 9 && e.shiftKey ) {
            $('.sc-related .sub').stop().slideUp(200);
            $('.sc-related .btn-related').removeClass('on');
        }
    });
    $('.sc-related .sub-list .sub-item:last-child').keydown(function(e){
        if ( e.keyCode === 9 && !e.shiftKey ) {
            $('.sc-related .sub').stop().slideUp(200);
            $('.sc-related .btn-related').removeClass('on');
        }
    });
})

