-- 대리점(agency) 테이블 생성
CREATE TABLE IF NOT EXISTS agency (
    id            INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name          VARCHAR(100) NOT NULL,          -- 대리점명
    region        VARCHAR(50)  NOT NULL,           -- 지역
    address       VARCHAR(200) NOT NULL,           -- 주소
    manager_name  VARCHAR(50)  NOT NULL,           -- 담당자명
    phone         VARCHAR(20)  NOT NULL,           -- 연락처
    email         VARCHAR(100),                    -- 이메일
    open_date     DATE         NOT NULL,           -- 개점일
    status        VARCHAR(20)  NOT NULL DEFAULT 'ACTIVE',  -- 운영상태 (ACTIVE, CLOSED 등)
    created_at    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 대리점 10건 생성
INSERT INTO agency (name, region, address, manager_name, phone, email, open_date, status) VALUES
('서울강남대리점',   '서울', '서울특별시 강남구 테헤란로 123',   '김민수', '02-1111-2222', 'gangnam@agency.com',   '2018-03-15', 'ACTIVE'),
('서울마포대리점',   '서울', '서울특별시 마포구 월드컵로 45',     '이지현', '02-2222-3333', 'mapo@agency.com',       '2019-06-01', 'ACTIVE'),
('부산해운대대리점', '부산', '부산광역시 해운대구 센텀로 78',     '박준형', '051-333-4444', 'haeundae@agency.com',  '2017-11-20', 'ACTIVE'),
('인천송도대리점',   '인천', '인천광역시 연수구 송도과학로 12',   '최영희', '032-444-5555', 'songdo@agency.com',    '2020-01-10', 'ACTIVE'),
('대구수성대리점',   '대구', '대구광역시 수성구 동대구로 34',     '정하늘', '053-555-6666', 'suseong@agency.com',   '2016-09-05', 'ACTIVE'),
('대전유성대리점',   '대전', '대전광역시 유성구 대학로 56',       '한상우', '042-666-7777', 'yuseong@agency.com',   '2021-04-22', 'ACTIVE'),
('광주광산대리점',   '광주', '광주광역시 광산구 하남산단로 89',   '오세영', '062-777-8888', 'gwangsan@agency.com',  '2015-07-30', 'CLOSED'),
('울산남구대리점',   '울산', '울산광역시 남구 삼산로 21',         '윤태호', '052-888-9999', 'namgu@agency.com',      '2019-12-01', 'ACTIVE'),
('경기수원대리점',   '경기', '경기도 수원시 영통구 광교로 67',    '서지민', '031-999-0000', 'suwon@agency.com',      '2022-02-14', 'ACTIVE'),
('경기성남대리점',   '경기', '경기도 성남시 분당구 판교역로 90',  '강도윤', '031-000-1111', 'seongnam@agency.com',  '2023-08-01', 'ACTIVE');
