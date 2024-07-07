package com.mercedes.pris.auditlogs.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuditLogRepository extends JpaRepository<AuditLogEntity,Long> {

    public AuditLogEntity findFirstByAuditSourceIdOrderByCreatedDateDesc(Long ruleId);

    public List<AuditLogEntity> findByAuditSourceTypeAndAuditSourceIdOrderByCreatedDateDesc(String auditSourceType,Long auditSourceId);
}

