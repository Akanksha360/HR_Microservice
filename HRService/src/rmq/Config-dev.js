"use strict";
exports.__esModule = true;
var Exchange = {
    Topics: [
        {
            TopicName: "EMPLOYEE_ADD",
            Publishers: ["API_GATEWAY_SERVICE"],
            Method: "POST",
            Subscribers: [
                {
                    Service: "HR_SERVICE",
                    OnSuccessTopicsToPush: ["EMPLOYEE_ADDED"],
                    OnFailureTopicsToPush: ["ERROR_RECEIVER"],
                    QueueName: "EMPLOYEE_ADD-HR_SERVICE"
                },
            ]
        },
        {
            TopicName: "EMPLOYEE_ADDED",
            Publishers: ["HR_SERVICE"],
            Method: "UNKNOWN",
            Subscribers: [
                {
                    Service: "API_GATEWAY_SERVICE",
                    OnSuccessTopicsToPush: [],
                    OnFailureTopicsToPush: [],
                    QueueName: "EMPLOYEE_ADDED-API_GATEWAY_SERVICE"
                },
            ]
        },
        {
            TopicName: "EMPLOYEE_UPDATE",
            Publishers: ["API_GATEWAY_SERVICE"],
            Method: "PUT",
            Subscribers: [
                {
                    Service: "HR_SERVICE",
                    OnSuccessTopicsToPush: ["EMPLOYEE_UPDATED"],
                    OnFailureTopicsToPush: ["ERROR_RECEIVER"],
                    QueueName: "EMPLOYEE_UPDATE-HR_SERVICE"
                },
            ]
        },
        {
            TopicName: "EMPLOYEE_UPDATED",
            Publishers: ["HR_SERVICE"],
            Method: "UNKNOWN",
            Subscribers: [
                {
                    Service: "API_GATEWAY_SERVICE",
                    OnSuccessTopicsToPush: [],
                    OnFailureTopicsToPush: [],
                    QueueName: "EMPLOYEE_UPDATED-API_GATEWAY_SERVICE"
                },
            ]
        },
        {
            TopicName: "EMPLOYEE_DELETE",
            Publishers: ["API_GATEWAY_SERVICE"],
            Method: "DELETE",
            Subscribers: [
                {
                    Service: "HR_SERVICE",
                    OnSuccessTopicsToPush: ["EMPLOYEE_DELETED"],
                    OnFailureTopicsToPush: ["ERROR_RECEIVER"],
                    QueueName: "EMPLOYEE_DELETE-HR_SERVICE"
                },
            ]
        },
        {
            TopicName: "EMPLOYEE_DELETED",
            Publishers: ["HR_SERVICE"],
            Method: "UNKNOWN",
            Subscribers: [
                {
                    Service: "API_GATEWAY_SERVICE",
                    OnSuccessTopicsToPush: [],
                    OnFailureTopicsToPush: [],
                    QueueName: "EMPLOYEE_DELETED-API_GATEWAY_SERVICE"
                },
            ]
        },
        {
            TopicName: "ERROR_RECEIVER",
            Publishers: ["HR_SERVICE"],
            Method: "UNKNOWN",
            Subscribers: [
                {
                    Service: "API_GATEWAY_SERVICE",
                    OnSuccessTopicsToPush: [],
                    OnFailureTopicsToPush: [],
                    QueueName: "ERROR_RECEIVER-API_GATEWAY_SERVICE"
                },
            ]
        },
        {
            TopicName: "DEPARTMENT_ADD",
            Publishers: ["API_GATEWAY_SERVICE"],
            Method: "POST",
            Subscribers: [
                {
                    Service: "HR_SERVICE",
                    OnSuccessTopicsToPush: ["DEPARTMENT_ADDED"],
                    OnFailureTopicsToPush: ["ERROR_RECEIVER"],
                    QueueName: "DEPARTMENT_ADD-HR_SERVICE"
                },
            ]
        },
        {
            TopicName: "DEPARTMENT_ADDED",
            Publishers: ["HR_SERVICE"],
            Method: "UNKNOWN",
            Subscribers: [
                {
                    Service: "API_GATEWAY_SERVICE",
                    OnSuccessTopicsToPush: [],
                    OnFailureTopicsToPush: [],
                    QueueName: "DEPARTMENT_ADDED-API_GATEWAY_SERVICE"
                },
            ]
        },
        {
            TopicName: "DEPARTMENT_UPDATE",
            Publishers: ["API_GATEWAY_SERVICE"],
            Method: "PUT",
            Subscribers: [
                {
                    Service: "HR_SERVICE",
                    OnSuccessTopicsToPush: ["DEPARTMENT_UPDATED"],
                    OnFailureTopicsToPush: ["ERROR_RECEIVER"],
                    QueueName: "DEPARTMENT_UPDATE-HR_SERVICE"
                },
            ]
        },
        {
            TopicName: "DEPARTMENT_UPDATED",
            Publishers: ["HR_SERVICE"],
            Method: "UNKNOWN",
            Subscribers: [
                {
                    Service: "API_GATEWAY_SERVICE",
                    OnSuccessTopicsToPush: [],
                    OnFailureTopicsToPush: [],
                    QueueName: "DEPARTMENT_UPDATED-API_GATEWAY_SERVICE"
                },
            ]
        },
        {
            TopicName: "DEPARTMENT_DELETE",
            Publishers: ["API_GATEWAY_SERVICE"],
            Method: "DELETE",
            Subscribers: [
                {
                    Service: "HR_SERVICE",
                    OnSuccessTopicsToPush: ["DEPARTMENT_DELETED"],
                    OnFailureTopicsToPush: ["ERROR_RECEIVER"],
                    QueueName: "DEPARTMENT_DELETE-HR_SERVICE"
                },
            ]
        },
        {
            TopicName: "DEPARTMENT_DELETED",
            Publishers: ["HR_SERVICE"],
            Method: "UNKNOWN",
            Subscribers: [
                {
                    Service: "API_GATEWAY_SERVICE",
                    OnSuccessTopicsToPush: [],
                    OnFailureTopicsToPush: [],
                    QueueName: "DEPARTMENT_DELETED-API_GATEWAY_SERVICE"
                },
            ]
        },
        /////////////////////////EMPLOYEEDEPARTMENT/////////////////////////////////////
        {
            TopicName: "EMPLOYEEDEPARTMENT_ADD",
            Publishers: ["API_GATEWAY_SERVICE"],
            Method: "POST",
            Subscribers: [
                {
                    Service: "HR_SERVICE",
                    OnSuccessTopicsToPush: ["EMPLOYEEDEPARTMENT_ADDED"],
                    OnFailureTopicsToPush: ["ERROR_RECEIVER"],
                    QueueName: "EMPLOYEEDEPARTMENT_ADD-HR_SERVICE"
                },
            ]
        },
        {
            TopicName: "EMPLOYEEDEPARTMENT_ADDED",
            Publishers: ["HR_SERVICE"],
            Method: "UNKNOWN",
            Subscribers: [
                {
                    Service: "API_GATEWAY_SERVICE",
                    OnSuccessTopicsToPush: [],
                    OnFailureTopicsToPush: [],
                    QueueName: "EMPLOYEEDEPARTMENT_ADDED-API_GATEWAY_SERVICE"
                },
            ]
        },
        {
            TopicName: "EMPLOYEEDEPARTMENT_UPDATE",
            Publishers: ["API_GATEWAY_SERVICE"],
            Method: "PUT",
            Subscribers: [
                {
                    Service: "HR_SERVICE",
                    OnSuccessTopicsToPush: ["EMPLOYEEDEPARTMENT_UPDATED"],
                    OnFailureTopicsToPush: ["ERROR_RECEIVER"],
                    QueueName: "EMPLOYEEDEPARTMENT_UPDATE-HR_SERVICE"
                },
            ]
        },
        {
            TopicName: "EMPLOYEEDEPARTMENT_UPDATED",
            Publishers: ["HR_SERVICE"],
            Method: "UNKNOWN",
            Subscribers: [
                {
                    Service: "API_GATEWAY_SERVICE",
                    OnSuccessTopicsToPush: [],
                    OnFailureTopicsToPush: [],
                    QueueName: "EMPLOYEEDEPARTMENT_UPDATED-API_GATEWAY_SERVICE"
                },
            ]
        },
        {
            TopicName: "EMPLOYEEDEPARTMENT_DELETE",
            Publishers: ["API_GATEWAY_SERVICE"],
            Method: "DELETE",
            Subscribers: [
                {
                    Service: "HR_SERVICE",
                    OnSuccessTopicsToPush: ["EMPLOYEEDEPARTMENT_DELETED"],
                    OnFailureTopicsToPush: ["ERROR_RECEIVER"],
                    QueueName: "EMPLOYEEDEPARTMENT_DELETE-HR_SERVICE"
                },
            ]
        },
        {
            TopicName: "EMPLOYEEDEPARTMENT_DELETED",
            Publishers: ["HR_SERVICE"],
            Method: "UNKNOWN",
            Subscribers: [
                {
                    Service: "API_GATEWAY_SERVICE",
                    OnSuccessTopicsToPush: [],
                    OnFailureTopicsToPush: [],
                    QueueName: "EMPLOYEEDEPARTMENT_DELETED-API_GATEWAY_SERVICE"
                },
            ]
        },
    ]
};
exports["default"] = Exchange;
