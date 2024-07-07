package com.mercedes.pris.auditlogs.controller;

import com.mercedes.pris.auditlogs.model.AuditLogCreate;
import com.mercedes.pris.auditlogs.persistence.AuditLogEntity;
import com.mercedes.pris.auditlogs.service.AuditLogService;
import com.mercedes.pris.diagnosticorder.model.DiagnosticOrderDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.http.ResponseEntity.status;

@RestController
@RequestMapping("/pris/audit")
public class AuditLogController {

    Logger logger = LoggerFactory.getLogger(AuditLogController.class);
 @Autowired
 private AuditLogService auditLogService;

    @Operation(summary = "Get Audit Log by source Id and source type")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Find the Audit Log  by Id",
                    content = {@Content(mediaType = "application/json")}),
            @ApiResponse(responseCode = "404", description = "Audit Log Not Found",
                    content = @Content)})
    @GetMapping("/{auditSourceType}/{auditSourceId}")
    public ResponseEntity<List<AuditLogEntity>> auditLog(@PathVariable String auditSourceType, @PathVariable Long auditSourceId){
        try {
            List<AuditLogEntity> auditLogs = auditLogService.getAuditLogs(auditSourceType, auditSourceId);
            return new ResponseEntity<>(auditLogs, HttpStatus.OK);
        } catch (Exception exception) {
            logger.error("Exception occurred while fetching audit logs", exception);
            return status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
