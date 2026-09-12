-- 매출(sales) 테이블 생성
CREATE TABLE IF NOT EXISTS sales (
    id            INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    agency_id     INT          NOT NULL REFERENCES agency(id),  -- 대리점
    item_id       INT          NOT NULL REFERENCES item(id),    -- 품목
    sale_date     DATE         NOT NULL,           -- 매출일자
    quantity      INT          NOT NULL,           -- 판매수량
    unit_price    NUMERIC(12,2) NOT NULL,          -- 판매단가
    amount        NUMERIC(14,2) NOT NULL,          -- 매출금액 (quantity * unit_price)
    created_at    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 매출 10건 생성 (2026-01-01 ~ 2026-09-12)
-- agency_id/item_id는 실제 저장된 이름/코드로 조회하여 FK 오류를 방지합니다.
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
