use grafana
go

if exists(select 1 from sys.tables where name = 'routing')
	begin	
		drop table routing
	end
go

create table routing(
	routingid int identity(1,1) not null,
	prefix varchar(50)  not null,
	nexthops varchar(50)   null,
	metric bit not null,
	protocol varchar(50)  not null,
	capture_date datetime not null default(getutcdate())
)

insert into routing(prefix,nexthops,metric,protocol, capture_date)
select '1.1.1.1/32', '172.26.0.1, 172.26.100.100', 0, 'static', dateadd(MINUTE,-30,GETUTCDATE())
union all
select '2.2.2.2/32', null, 1, 'connected', dateadd(MINUTE,-30,GETUTCDATE()) union all

select '4.4.0.0/16', '172.31.1.1', 0, 'static', dateadd(MINUTE,-30,GETUTCDATE())


insert into routing(prefix,nexthops,metric,protocol)
select '1.1.1.1/32','172.26.0.1' , 0, 'static'
union all
select '3.3.3.0/24', '172.26.0.2', 1, 'connected' union all
select '4.4.0.0/16', '172.31.1.1', 0, 'static'

;with latest
as
(
	select t.prefix,
		   t.nexthops,
		   t.metric,
		   t.protocol,
		   t.capture_date
	  from routing t
	 inner join (
		select max(capture_date) as MaxDate
		  from routing mx
	) tm on t.capture_date = tm.MaxDate
), previous as
(
	select t.prefix,
		   t.nexthops,
		   t.metric,
		   t.protocol,
		   t.capture_date
	  from routing t
	 inner join (
		select  
		       min(capture_date) as MinDate
		  from routing mx
		 --group by prefix
	) tm on t.capture_date = tm.MinDate
)
--select * from previous

select l.prefix,
       l.nexthops,
	   l.metric,
	   l.protocol,
	   'changed' as change
  from latest l
  join previous p on l.prefix = p.prefix
   and l.nexthops <> p.nexthops
union all
select prefix,
       nexthops,
	   metric,
	   protocol,
	   'removed' as change
  from previous 
  where prefix not in (select prefix from latest)
union all
select prefix,
       nexthops,
	   metric,
	   protocol,
	   'added' as change
  from latest l
  where l.prefix not in (select l.prefix from previous l)