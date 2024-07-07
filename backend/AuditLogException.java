package com.mercedes.pris.auditlogs.exception;

public class AuditLogException extends RuntimeException{
    public AuditLogException(String errorMessage) {
        super(errorMessage);
    }

    public AuditLogException(String errorMessage, Throwable cause) {
        super(errorMessage, cause);
    }

}
