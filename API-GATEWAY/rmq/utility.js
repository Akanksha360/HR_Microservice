"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.Utility = void 0;
///File to publish subscribe Topics...
var Config_dev_1 = require("./Config-dev");
var ReponseModel_1 = require("../ReponseModel");
var amqp = require('amqplib/callback_api');
var buffer_1 = require("buffer");
var Utility = /** @class */ (function () {
    function Utility() {
        this.queueURLMap = {};
        this.rabbitmqURL = "amqp://localhost";
        this.topicNames = [];
        this.init_utility(); //creating all the exchanges and bindQueues as constructor executes
    }
    Utility.getInstance = function () {
        if (!Utility.instance) {
            Utility.instance = new Utility();
        }
        return Utility.instance;
    };
    Utility.prototype.init_utility = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                try {
                    console.log("Connecting toooooooooo rabbitmq " +"amqp://guest:guest@localhost:5672");
                    amqp.connect("amqp://guest:guest@localhost:5672", function (err, connection) {
                        if (err) {
                            console.log("from connection", err);
                        }
                        connection?.createChannel(function (err, channel) {
                            if (err) {
                                console.log("from connection", err);
                            }
                            _this.channel = channel;
                            //Reading All the Topics
                            var topics = Config_dev_1["default"].Topics;
                            for (var i = 0; i < topics.length; i++) {
                                var topic = topics[i];
                                var topicName = topic.TopicName;
                                _this.topicNames.push(topicName);
                                //Asserting the exchange
                                channel.assertExchange(topicName, "fanout", {
                                    durable: true
                                });
                                var subscribers = topic.Subscribers;
                                for (var j = 0; j < subscribers.length; j++) {
                                    var subscriber = subscribers[j];
                                    var queueName = subscriber.QueueName;
                                    channel.assertQueue(queueName, {
                                        exclusive: false
                                    });
                                    channel.bindQueue(queueName, topicName, ""); //(EMPLOYYEE_ADDED, EMPLOYEE_ADD-HR_SERVICE)
                                    var queueURLMapValue = {
                                        queueName: queueName,
                                        OnSuccessTopicsToPush: subscriber.OnSuccessTopicsToPush,
                                        OnFailureTopicsToPush: subscriber.OnFailureTopicsToPush
                                    };
                                    _this.queueURLMap[queueName] = queueURLMapValue;
                                }
                            }
                        });
                    });
                }
                catch (error) {
                    console.log(error.message);
                }
                return [2 /*return*/];
            });
        });
    };
    Utility.prototype.PublicMessageToTopic = function (topicName, message) {
        // console.log("message in publcih",message)
        var data = buffer_1.Buffer.from(JSON.stringify(message));
        if (this.topicNames.includes(topicName)) {
            this.channel.publish(topicName, "", data);
            var response = new ReponseModel_1["default"](200, "SUCCESS", "POST", "Successfully published into Topic Name : ".concat(topicName, " "), {});
        }
        else {
            var response = new ReponseModel_1["default"](400, "FAILED", "POST", "Unalble to publish to Topic Name : ".concat(topicName, " "), {});
        }
        return response;
    };
    Utility.prototype.listenToService = function (topicName, serviceName, callBack) {
        return __awaiter(this, void 0, void 0, function () {
            var queueURLMapValue_1, queueName;
            var _this = this;
            return __generator(this, function (_a) {
                try {
                    queueURLMapValue_1 = this.queueURLMap[topicName + "-" + serviceName];
                    queueName = queueURLMapValue_1.queueName;
                    this.channel.consume(queueName, function (msg) {
                        if (msg.content) {
                            var message = JSON.parse(msg.content);
                            callBack({
                                message: message,
                                OnSuccessTopicsToPush: queueURLMapValue_1.OnSuccessTopicsToPush,
                                OnFailureTopicsToPush: queueURLMapValue_1.OnFailureTopicsToPush
                            });
                        }
                    }, { noAck: true });
                }
                catch (e) {
                    setTimeout(function () {
                        _this.listenToService(topicName, serviceName, callBack);
                    }, 5000);
                }
                return [2 /*return*/];
            });
        });
    };
    Utility.prototype.listenToServices = function (serviceName, callback) {
        var topics = Config_dev_1["default"].Topics;
        for (var i = 0; i < topics.length; i++) {
            var topic = topics[i];
            var topicName = topic.TopicName;
            var subscribers = topic.Subscribers;
            for (var j = 0; j < subscribers.length; j++) {
                var subscriber = subscribers[j];
                var vServiceName = subscriber.Service;
                if (vServiceName === serviceName) {
                    this.listenToService(topicName, serviceName, callback);
                }
            }
        }
    };
    return Utility;
}());
exports.Utility = Utility;
