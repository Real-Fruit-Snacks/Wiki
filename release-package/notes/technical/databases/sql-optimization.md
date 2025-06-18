---
title: SQL Query Optimization
tags: [sql, databases, performance, optimization]
created: 2024-01-22
author: Database Team
description: Advanced SQL optimization techniques and best practices
updated: 2024-02-18
category: technical
status: published
---

# SQL Query Optimization

## Understanding Query Execution

### EXPLAIN Plan Analysis

```sql
-- PostgreSQL
EXPLAIN (ANALYZE, BUFFERS) 
SELECT o.order_id, o.order_date, c.customer_name, 
       SUM(oi.quantity * oi.unit_price) as total
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
JOIN order_items oi ON o.order_id = oi.order_id
WHERE o.order_date >= '2024-01-01'
GROUP BY o.order_id, o.order_date, c.customer_name
ORDER BY total DESC
LIMIT 10;

-- MySQL
EXPLAIN FORMAT=JSON
SELECT ...;

-- SQL Server
SET STATISTICS IO ON;
SET STATISTICS TIME ON;
```

### Query Execution Order

1. FROM (including JOINs)
2. WHERE
3. GROUP BY
4. HAVING
5. SELECT
6. DISTINCT
7. ORDER BY
8. LIMIT/TOP

## Indexing Strategies

### Types of Indexes

```sql
-- B-Tree Index (default)
CREATE INDEX idx_customer_email ON customers(email);

-- Composite Index
CREATE INDEX idx_order_customer_date 
ON orders(customer_id, order_date);

-- Partial Index (PostgreSQL)
CREATE INDEX idx_active_users 
ON users(email) 
WHERE is_active = true;

-- Covering Index
CREATE INDEX idx_order_covering 
ON orders(customer_id, order_date) 
INCLUDE (total_amount, status);

-- Full-text Index (MySQL)
CREATE FULLTEXT INDEX idx_product_search 
ON products(name, description);

-- JSON Index (PostgreSQL)
CREATE INDEX idx_metadata 
ON products((metadata->>'category'));
```

### Index Selection Guidelines

| Scenario | Recommended Index Type |
|----------|----------------------|
| High cardinality columns | B-Tree |
| Low cardinality columns | Bitmap (Oracle) or Filtered |
| Range queries | B-Tree |
| Full-text search | Full-text |
| JSON queries | GIN/GiST |
| Spatial data | R-Tree |

## Query Optimization Patterns

### Avoid N+1 Queries

```sql
-- Bad: N+1 problem
-- First query
SELECT * FROM authors;
-- Then N queries
SELECT * FROM books WHERE author_id = ?;

-- Good: Single query with JOIN
SELECT a.*, b.*
FROM authors a
LEFT JOIN books b ON a.author_id = b.author_id
ORDER BY a.author_id, b.published_date;

-- Or using subquery
SELECT *,
       (SELECT JSON_AGG(b.*) 
        FROM books b 
        WHERE b.author_id = a.author_id) as books
FROM authors a;
```

### Optimize Subqueries

```sql
-- Inefficient: Correlated subquery
SELECT c.customer_name,
       (SELECT COUNT(*) 
        FROM orders o 
        WHERE o.customer_id = c.customer_id) as order_count
FROM customers c;

-- Better: JOIN with GROUP BY
SELECT c.customer_name, COUNT(o.order_id) as order_count
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.customer_name;

-- Best: Using window function
SELECT DISTINCT 
       c.customer_name,
       COUNT(o.order_id) OVER (PARTITION BY c.customer_id) as order_count
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id;
```

### EXISTS vs IN vs JOIN

```sql
-- EXISTS (best for existence check)
SELECT c.*
FROM customers c
WHERE EXISTS (
    SELECT 1 
    FROM orders o 
    WHERE o.customer_id = c.customer_id 
    AND o.status = 'completed'
);

-- IN (good for small lists)
SELECT *
FROM products
WHERE category_id IN (1, 2, 3);

-- JOIN (best for retrieving data from both tables)
SELECT DISTINCT c.*
FROM customers c
INNER JOIN orders o ON c.customer_id = o.customer_id
WHERE o.status = 'completed';
```

## Advanced Optimization Techniques

### Common Table Expressions (CTEs)

```sql
-- Recursive CTE for hierarchical data
WITH RECURSIVE category_tree AS (
    -- Anchor member
    SELECT category_id, name, parent_id, 0 as level
    FROM categories
    WHERE parent_id IS NULL
    
    UNION ALL
    
    -- Recursive member
    SELECT c.category_id, c.name, c.parent_id, ct.level + 1
    FROM categories c
    INNER JOIN category_tree ct ON c.parent_id = ct.category_id
)
SELECT * FROM category_tree
ORDER BY level, name;

-- Multiple CTEs for complex queries
WITH 
monthly_sales AS (
    SELECT DATE_TRUNC('month', order_date) as month,
           SUM(total_amount) as revenue
    FROM orders
    WHERE order_date >= CURRENT_DATE - INTERVAL '1 year'
    GROUP BY 1
),
monthly_growth AS (
    SELECT month,
           revenue,
           LAG(revenue) OVER (ORDER BY month) as prev_revenue,
           (revenue - LAG(revenue) OVER (ORDER BY month)) / 
           LAG(revenue) OVER (ORDER BY month) * 100 as growth_rate
    FROM monthly_sales
)
SELECT * FROM monthly_growth
WHERE growth_rate IS NOT NULL
ORDER BY month;
```

### Window Functions

```sql
-- Ranking and analytics
SELECT 
    customer_id,
    order_date,
    total_amount,
    ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date) as order_seq,
    RANK() OVER (ORDER BY total_amount DESC) as amount_rank,
    SUM(total_amount) OVER (PARTITION BY customer_id ORDER BY order_date 
                           ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) as running_total,
    AVG(total_amount) OVER (PARTITION BY customer_id) as avg_order_value,
    LEAD(order_date) OVER (PARTITION BY customer_id ORDER BY order_date) as next_order_date
FROM orders;

-- Moving averages
SELECT 
    date,
    sales,
    AVG(sales) OVER (ORDER BY date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) as ma7,
    AVG(sales) OVER (ORDER BY date ROWS BETWEEN 29 PRECEDING AND CURRENT ROW) as ma30
FROM daily_sales;
```

### Materialized Views

```sql
-- PostgreSQL
CREATE MATERIALIZED VIEW monthly_customer_summary AS
SELECT 
    c.customer_id,
    c.customer_name,
    DATE_TRUNC('month', o.order_date) as month,
    COUNT(o.order_id) as order_count,
    SUM(o.total_amount) as total_spent,
    AVG(o.total_amount) as avg_order_value
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.customer_name, DATE_TRUNC('month', o.order_date);

CREATE INDEX idx_mv_customer_month 
ON monthly_customer_summary(customer_id, month);

-- Refresh strategies
REFRESH MATERIALIZED VIEW monthly_customer_summary;
REFRESH MATERIALIZED VIEW CONCURRENTLY monthly_customer_summary;
```

## Performance Anti-patterns

### 1. SELECT * Abuse
```sql
-- Bad
SELECT * FROM large_table;

-- Good
SELECT id, name, email FROM large_table;
```

### 2. Implicit Type Conversion
```sql
-- Bad (if user_id is integer)
SELECT * FROM users WHERE user_id = '123';

-- Good
SELECT * FROM users WHERE user_id = 123;
```

### 3. Functions on Indexed Columns
```sql
-- Bad (can't use index)
SELECT * FROM orders 
WHERE YEAR(order_date) = 2024;

-- Good (can use index)
SELECT * FROM orders 
WHERE order_date >= '2024-01-01' 
AND order_date < '2025-01-01';
```

### 4. OR Conditions
```sql
-- Bad (may not use indexes efficiently)
SELECT * FROM products 
WHERE category = 'Electronics' OR brand = 'Apple';

-- Better (UNION with indexes)
SELECT * FROM products WHERE category = 'Electronics'
UNION
SELECT * FROM products WHERE brand = 'Apple';
```

## Query Tuning Checklist

1. **Analyze execution plan**
   - Look for table scans
   - Check join methods
   - Identify sorting operations

2. **Index optimization**
   - Missing indexes
   - Unused indexes
   - Index fragmentation

3. **Query structure**
   - Simplify complex queries
   - Eliminate unnecessary joins
   - Use appropriate join types

4. **Data types**
   - Consistent types in joins
   - Appropriate column sizes
   - Avoid unnecessary conversions

5. **Statistics**
   ```sql
   -- Update statistics (SQL Server)
   UPDATE STATISTICS table_name;
   
   -- Analyze table (PostgreSQL)
   ANALYZE table_name;
   ```

## Monitoring Queries

### PostgreSQL
```sql
-- Current queries
SELECT pid, now() - pg_stat_activity.query_start AS duration, query 
FROM pg_stat_activity 
WHERE (now() - pg_stat_activity.query_start) > interval '5 minutes';

-- Slow query log
ALTER SYSTEM SET log_min_duration_statement = 1000; -- 1 second
```

### MySQL
```sql
-- Enable slow query log
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 2;

-- Performance schema
SELECT * FROM performance_schema.events_statements_summary_by_digest
ORDER BY SUM_TIMER_WAIT DESC
LIMIT 10;
```