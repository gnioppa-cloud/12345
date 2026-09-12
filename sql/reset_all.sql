-- ===== 기존 테이블 초기화 (순서 중요: sales -> item -> agency) =====
DROP TABLE IF EXISTS sales CASCADE;
DROP TABLE IF EXISTS item CASCADE;
DROP TABLE IF EXISTS agency CASCADE;

-- ===== 1. 대리점(agency) =====
CREATE TABLE agency (
    id            INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name          VARCHAR(100) NOT NULL,
    region        VARCHAR(50)  NOT NULL,
    address       VARCHAR(200) NOT NULL,
    manager_name  VARCHAR(50)  NOT NULL,
    phone         VARCHAR(20)  NOT NULL,
    email         VARCHAR(100),
    open_date     DATE         NOT NULL,
    status        VARCHAR(20)  NOT NULL DEFAULT 'ACTIVE',
    created_at    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);

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

-- ===== 2. 품목(item) =====
CREATE TABLE item (
    id            INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    item_code     VARCHAR(20)  NOT NULL UNIQUE,
    name          VARCHAR(100) NOT NULL,
    category      VARCHAR(50)  NOT NULL,
    spec          VARCHAR(100),
    unit          VARCHAR(10)  NOT NULL,
    unit_price    NUMERIC(12,2) NOT NULL,
    stock_qty     INT          NOT NULL DEFAULT 0,
    status        VARCHAR(20)  NOT NULL DEFAULT 'ACTIVE',
    created_at    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO item (item_code, name, category, spec, unit, unit_price, stock_qty, status) VALUES
('ITM-001', '노트북 15형',       '전자기기', 'i5/16GB/512GB',   'EA',  1250000.00, 35,  'ACTIVE'),
('ITM-002', '무선 마우스',       '전자기기', '2.4GHz',          'EA',  25000.00,   200, 'ACTIVE'),
('ITM-003', '기계식 키보드',     '전자기기', '청축/한글',       'EA',  89000.00,   120, 'ACTIVE'),
('ITM-004', '27인치 모니터',     '전자기기', 'FHD/IPS',         'EA',  210000.00,  60,  'ACTIVE'),
('ITM-005', 'A4 복사용지',       '사무용품', '80g/2500매',      'BOX', 32000.00,   500, 'ACTIVE'),
('ITM-006', '볼펜 세트',         '사무용품', '흑색/12자루',     'SET', 6000.00,    800, 'ACTIVE'),
('ITM-007', '사무용 의자',       '가구',     '메쉬/틸팅',       'EA',  145000.00,  40,  'ACTIVE'),
('ITM-008', '접이식 책상',       '가구',     '1200x600mm',      'EA',  98000.00,   25,  'ACTIVE'),
('ITM-009', '외장 SSD 1TB',      '전자기기', 'USB-C',           'EA',  135000.00,  70,  'ACTIVE'),
('ITM-010', '레이저 프린터',     '전자기기', '흑백/네트워크',   'EA',  320000.00,  15,  'DISCONTINUED');

-- ===== 3. 매출(sales) =====
CREATE TABLE sales (
    id            INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    agency_id     INT          NOT NULL REFERENCES agency(id),
    item_id       INT          NOT NULL REFERENCES item(id),
    sale_date     DATE         NOT NULL,
    quantity      INT          NOT NULL,
    unit_price    NUMERIC(12,2) NOT NULL,
    amount        NUMERIC(14,2) NOT NULL,
    created_at    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO sales (agency_id, item_id, sale_date, quantity, unit_price, amount)
SELECT a.id, i.id, v.sale_date::date, v.quantity, v.unit_price, v.amount
FROM (VALUES
    ('서울강남대리점',   'ITM-001', '2026-01-08', 3,  1250000.00, 3750000.00),
    ('서울마포대리점',   'ITM-003', '2026-02-14', 10, 89000.00,   890000.00),
    ('부산해운대대리점', 'ITM-005', '2026-03-03', 20, 32000.00,   640000.00),
    ('인천송도대리점',   'ITM-002', '2026-03-27', 15, 25000.00,   375000.00),
    ('대구수성대리점',   'ITM-007', '2026-04-16', 2,  145000.00,  290000.00),
    ('대전유성대리점',   'ITM-004', '2026-05-05', 5,  210000.00,  1050000.00),
    ('광주광산대리점',   'ITM-009', '2026-06-11', 4,  135000.00,  540000.00),
    ('울산남구대리점',   'ITM-006', '2026-07-09', 30, 6000.00,    180000.00),
    ('경기수원대리점',   'ITM-008', '2026-08-19', 6,  98000.00,   588000.00),
    ('경기성남대리점',   'ITM-010', '2026-09-02', 1,  320000.00,  320000.00)
) AS v(agency_name, item_code, sale_date, quantity, unit_price, amount)
JOIN agency a ON a.name = v.agency_name
JOIN item   i ON i.item_code = v.item_code;
