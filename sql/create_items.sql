-- 품목(item) 테이블 생성
CREATE TABLE IF NOT EXISTS item (
    id            INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    item_code     VARCHAR(20)  NOT NULL UNIQUE,    -- 품목코드
    name          VARCHAR(100) NOT NULL,           -- 품목명
    category      VARCHAR(50)  NOT NULL,           -- 분류
    spec          VARCHAR(100),                    -- 규격
    unit          VARCHAR(10)  NOT NULL,           -- 단위 (EA, BOX 등)
    unit_price    NUMERIC(12,2) NOT NULL,          -- 단가
    stock_qty     INT          NOT NULL DEFAULT 0, -- 재고수량
    status        VARCHAR(20)  NOT NULL DEFAULT 'ACTIVE',  -- 판매상태 (ACTIVE, DISCONTINUED 등)
    created_at    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 품목 10건 생성
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
