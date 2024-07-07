package com.mercedes.pris.auditlogs.service;

import com.mercedes.pris.auditlogs.exception.AuditLogException;
import com.mercedes.pris.auditlogs.model.AuditLogCreate;
import com.mercedes.pris.auditlogs.persistence.AuditLogEntity;
import com.mercedes.pris.auditlogs.persistence.AuditLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.ArrayList;
import java.util.List;

@Service
public class AuditLogService {

    @Autowired
    AuditLogRepository auditLogRepository;

    public void recordAuditLogs(List<AuditLogCreate> auditLogCreateList){
        try{
            List<AuditLogEntity> logEntityList = mapAuditLogCreateToEntity(auditLogCreateList);
            auditLogRepository.saveAll(logEntityList);
        } catch (Exception ex){
            throw new AuditLogException("Error creating audit log",ex);
        }
    }

    private List<AuditLogEntity> mapAuditLogCreateToEntity(List<AuditLogCreate> auditLogCreateList){
        List<AuditLogEntity> auditLogEntityList = new ArrayList<>();
        auditLogCreateList.forEach(auditLogCreate -> {
            AuditLogEntity auditLogEntity = AuditLogEntity.builder()
                    .auditSourceId(auditLogCreate.getAuditSourceId())
                    .auditSourceType(auditLogCreate.getAuditSourceType())
                    .action(auditLogCreate.getAction())
                    .description(auditLogCreate.getDescription())
                    .oldValue(auditLogCreate.getOldValue())
                    .newValue(auditLogCreate.getNewValue())
                    .createdBy(auditLogCreate.getCreatedBy())
                    .createdDate(auditLogCreate.getCreatedDate())
                    .version(auditLogCreate.getVersion())
                    .build();
            auditLogEntityList.add(auditLogEntity);
        });
        return auditLogEntityList;
    }

    public List<AuditLogEntity> getAuditLogs(String auditSourceType, Long auditSourceId ){
        try{
        return auditLogRepository.findByAuditSourceTypeAndAuditSourceIdOrderByCreatedDateDesc(auditSourceType,auditSourceId);
        } catch (Exception ex){
            throw new AuditLogException("Error fetching audit log",ex);
        }
    }
}
