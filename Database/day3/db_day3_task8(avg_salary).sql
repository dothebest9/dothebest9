#select position,count(*) as employees_count from employees GROUP BY position;#포지션갯수와 인원수 출력결과값
#select avg(salary) from employees where position='backend';#백엔드평균연봉
#select avg(salary) from employees where position='frontend'#프론트엔드평균연봉
#select avg(salary) from employees where position='pm'#pm평균연봉
select position,avg(salary) as avg_salary from employees GROUP BY position;#직업별 평균 연봉 출력결과값