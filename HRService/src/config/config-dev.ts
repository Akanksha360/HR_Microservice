module.exports = {
    Topics: [
        {
            TopicName: "EMPLOYEE_ADD",
            Publishers: [
                "API-GATEWAY"
            ],
            Method: "POST",
            Subscribers: [
                {
                    Service: "HRService",
                    OnSuccessTopicsToPush: [
                        "EMPLOYEE_ADDED"
                    ],
                    OnFailureTopicsToPush: [
                        "ERROR_RECEIVER"
                    ],
                    QueueName: "EMPLOYEE_ADD-HRService",
                    RoutingKey:"EMPLOYEE_ADD"
                }
            ]
        },
        {
            TopicName: "EMPLOYEE_DELETE",
            Publishers: [
                "API-GATEWAY"
            ],
            Method: "DELETE",
            Subscribers: [
                {
                    Service: "HRService",
                    OnSuccessTopicsToPush: [
                        "EMPLOYEE_DELETED"
                    ],
                    OnFailureTopicsToPush: [
                        "ERROR_RECEIVER"
                    ],
                    QueueName: "EMPLOYEE_DELETE-HRService",
                    RoutingKey:"EMPLOYEE_DELETE"
                }
            ]
        },
        {
            TopicName: "EMPLOYEE_UPDATE",
            Publishers: [
                "API-GATEWAY"
            ],
            Method: "PUT",
            Subscribers: [
                {
                    Service: "HRService",
                    OnSuccessTopicsToPush: [
                        "EMPLOYEE_UPDATED"
                    ],
                    OnFailureTopicsToPush: [
                        "ERROR_RECEIVER"
                    ],
                    QueueName: "EMPLOYEE_UPDATE-HRService",
                    RoutingKey:"EMPLOYEE_UPDATE"
                }
            ]
        },
        {
            TopicName: "DEPARTMENT_ADD",
            Publishers: [
                "API-GATEWAY"
            ],
            Method: "POST",
            Subscribers: [
                {
                    Service: "HRService",
                    OnSuccessTopicsToPush: [
                        "DEPARTMENT_ADDED"
                    ],
                    OnFailureTopicsToPush: [
                        "ERROR_RECEIVER"
                    ],
                    QueueName: "DEPARTMENT_ADD-HRService",
                    RoutingKey:"DEPARTMENT_ADD"
                }
            ]
        },
        {
            TopicName: "DEPARTMENT_UPDATE",
            Publishers: [
                "API-GATEWAY"
            ],
            Method: "PUT",
            Subscribers: [
                {
                    Service: "HRService",
                    OnSuccessTopicsToPush: [
                        "DEPARTMENT_UPDATE"
                    ],
                    OnFailureTopicsToPush: [
                        "ERROR_RECEIVER"
                    ],
                    QueueName: "DEPARTMENT_UPDATE-HRService",
                    RoutingKey:"DEPARTMENT_UPDATE"
                }
            ]
        },
        {
            TopicName: "DEPARTMENT_DELETE",
            Publishers: [
                "API-GATEWAY"
            ],
            Method: "DELETE",
            Subscribers: [
                {
                    Service: "HRService",
                    OnSuccessTopicsToPush: [
                        "DEPARTMENT_DELETE"
                    ],
                    OnFailureTopicsToPush: [
                        "ERROR_RECEIVER"
                    ],
                    QueueName: "DEPARTMENT_DELETE-HRService",
                    RoutingKey:"DEPARTMENT_DELETE"
                }
            ]
        },
        {
            TopicName: "EMPLOYEEDEPARTMENT_ADD",
            Publishers: [
                "API-GATEWAY"
            ],
            Method: "POST",
            Subscribers: [
                {
                    Service: "HRService",
                    OnSuccessTopicsToPush: [
                        "EMPLOYEEDEPARTMENT_ADDED"
                    ],
                    OnFailureTopicsToPush: [
                        "ERROR_RECEIVER"
                    ],
                    QueueName: "EMPLOYEEDEPARTMENT_ADD-HRService",
                    RoutingKey:"EMPLOYEEDEPARTMENT_ADD"
                }
            ]
        },
        {
            TopicName: "EMPLOYEEDEPARTMENT_UPDATE",
            Publishers: [
                "API-GATEWAY"
            ],
            Method: "PUT",
            Subscribers: [
                {
                    Service: "HRService",
                    OnSuccessTopicsToPush: [
                        "EMPLOYEEDEPARTMENT_UPDATE"
                    ],
                    OnFailureTopicsToPush: [
                        "ERROR_RECEIVER"
                    ],
                    QueueName: "EMPLOYEEDEPARTMENT_UPDATE-HRService",
                    RoutingKey:"EMPLOYEEDEPARTMENT_UPDATE"
                }
            ]
        },
        {
            TopicName: "EMPLOYEEDEPARTMENT_DELETE",
            Publishers: [
                "API-GATEWAY"
            ],
            Method: "DELETE",
            Subscribers: [
                {
                    Service: "HRService",
                    OnSuccessTopicsToPush: [
                        "EMPLOYEEDEPARTMENT_DELETED"
                    ],
                    OnFailureTopicsToPush: [
                        "ERROR_RECEIVER"
                    ],
                    QueueName: "EMPLOYEEDEPARTMENT_DELETE-HRService",
                    RoutingKey:"EMPLOYEEDEPARTMENT_DELETE"
                }
            ]
        },


    ]
}