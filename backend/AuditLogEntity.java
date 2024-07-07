package com.mercedes.pris.auditlogs.persistence;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.sql.Timestamp;

@Data
@Entity
@Table(name = "audit_logs")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AuditLogEntity {
    @Id
    @GeneratedValue(generator = "sequence-generator_audit_log")
    @GenericGenerator(
            name = "sequence-generator_audit_log",
            strategy = "org.hibernate.id.enhanced.SequenceStyleGenerator",
            parameters = {
                    @org.hibernate.annotations.Parameter(name = "sequence_name", value = "AUDIT_LOGS_ID_SEQ"),
                    @org.hibernate.annotations.Parameter(name = "initial_value", value = "1"),
                    @org.hibernate.annotations.Parameter(name = "increment_size", value = "1")
            }
    )
    private Long auditId;
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
