package com.mercedes.pris.auditlogs.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuditLogCreate {

    private Long auditSourceId;
    private String auditSourceType;
    private String action;
    private String description;
    private String oldValue;
    private String newValue;
    private String createdBy;
    private Timestamp createdDate;
    private Integer version;
}
