/******/ (() => {
  // webpackBootstrap
  /******/ var __webpack_modules__ = {
    /***/ "../node_modules/rxjs/dist/esm5/internal/NotificationFactories.js":
      /*!************************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/NotificationFactories.js ***!
  \************************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ COMPLETE_NOTIFICATION: () =>
            /* binding */ COMPLETE_NOTIFICATION,
          /* harmony export */ createNotification: () =>
            /* binding */ createNotification,
          /* harmony export */ errorNotification: () =>
            /* binding */ errorNotification,
          /* harmony export */ nextNotification: () =>
            /* binding */ nextNotification,
          /* harmony export */
        });
        var COMPLETE_NOTIFICATION = (function () {
          return createNotification("C", undefined, undefined);
        })();
        function errorNotification(error) {
          return createNotification("E", undefined, error);
        }
        function nextNotification(value) {
          return createNotification("N", value, undefined);
        }
        function createNotification(kind, value, error) {
          return {
            kind: kind,
            value: value,
            error: error,
          };
        }
        //# sourceMappingURL=NotificationFactories.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/Observable.js":
      /*!*************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/Observable.js ***!
  \*************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ Observable: () => /* binding */ Observable,
          /* harmony export */
        });
        /* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ./Subscriber */ "../node_modules/rxjs/dist/esm5/internal/Subscriber.js"
          );
        /* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_6__ =
          __webpack_require__(
            /*! ./Subscription */ "../node_modules/rxjs/dist/esm5/internal/Subscription.js"
          );
        /* harmony import */ var _symbol_observable__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! ./symbol/observable */ "../node_modules/rxjs/dist/esm5/internal/symbol/observable.js"
          );
        /* harmony import */ var _util_pipe__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(
            /*! ./util/pipe */ "../node_modules/rxjs/dist/esm5/internal/util/pipe.js"
          );
        /* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(
            /*! ./config */ "../node_modules/rxjs/dist/esm5/internal/config.js"
          );
        /* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(
            /*! ./util/isFunction */ "../node_modules/rxjs/dist/esm5/internal/util/isFunction.js"
          );
        /* harmony import */ var _util_errorContext__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ./util/errorContext */ "../node_modules/rxjs/dist/esm5/internal/util/errorContext.js"
          );

        var Observable = (function () {
          function Observable(subscribe) {
            if (subscribe) {
              this._subscribe = subscribe;
            }
          }
          Observable.prototype.lift = function (operator) {
            var observable = new Observable();
            observable.source = this;
            observable.operator = operator;
            return observable;
          };
          Observable.prototype.subscribe = function (
            observerOrNext,
            error,
            complete
          ) {
            var _this = this;
            var subscriber = isSubscriber(observerOrNext)
              ? observerOrNext
              : new _Subscriber__WEBPACK_IMPORTED_MODULE_0__.SafeSubscriber(
                  observerOrNext,
                  error,
                  complete
                );
            (0, _util_errorContext__WEBPACK_IMPORTED_MODULE_1__.errorContext)(
              function () {
                var _a = _this,
                  operator = _a.operator,
                  source = _a.source;
                subscriber.add(
                  operator
                    ? operator.call(subscriber, source)
                    : source
                    ? _this._subscribe(subscriber)
                    : _this._trySubscribe(subscriber)
                );
              }
            );
            return subscriber;
          };
          Observable.prototype._trySubscribe = function (sink) {
            try {
              return this._subscribe(sink);
            } catch (err) {
              sink.error(err);
            }
          };
          Observable.prototype.forEach = function (next, promiseCtor) {
            var _this = this;
            promiseCtor = getPromiseCtor(promiseCtor);
            return new promiseCtor(function (resolve, reject) {
              var subscriber =
                new _Subscriber__WEBPACK_IMPORTED_MODULE_0__.SafeSubscriber({
                  next: function (value) {
                    try {
                      next(value);
                    } catch (err) {
                      reject(err);
                      subscriber.unsubscribe();
                    }
                  },
                  error: reject,
                  complete: resolve,
                });
              _this.subscribe(subscriber);
            });
          };
          Observable.prototype._subscribe = function (subscriber) {
            var _a;
            return (_a = this.source) === null || _a === void 0
              ? void 0
              : _a.subscribe(subscriber);
          };
          Observable.prototype[
            _symbol_observable__WEBPACK_IMPORTED_MODULE_2__.observable
          ] = function () {
            return this;
          };
          Observable.prototype.pipe = function () {
            var operations = [];
            for (var _i = 0; _i < arguments.length; _i++) {
              operations[_i] = arguments[_i];
            }
            return (0, _util_pipe__WEBPACK_IMPORTED_MODULE_3__.pipeFromArray)(
              operations
            )(this);
          };
          Observable.prototype.toPromise = function (promiseCtor) {
            var _this = this;
            promiseCtor = getPromiseCtor(promiseCtor);
            return new promiseCtor(function (resolve, reject) {
              var value;
              _this.subscribe(
                function (x) {
                  return (value = x);
                },
                function (err) {
                  return reject(err);
                },
                function () {
                  return resolve(value);
                }
              );
            });
          };
          Observable.create = function (subscribe) {
            return new Observable(subscribe);
          };
          return Observable;
        })();

        function getPromiseCtor(promiseCtor) {
          var _a;
          return (_a =
            promiseCtor !== null && promiseCtor !== void 0
              ? promiseCtor
              : _config__WEBPACK_IMPORTED_MODULE_4__.config.Promise) !== null &&
            _a !== void 0
            ? _a
            : Promise;
        }
        function isObserver(value) {
          return (
            value &&
            (0, _util_isFunction__WEBPACK_IMPORTED_MODULE_5__.isFunction)(
              value.next
            ) &&
            (0, _util_isFunction__WEBPACK_IMPORTED_MODULE_5__.isFunction)(
              value.error
            ) &&
            (0, _util_isFunction__WEBPACK_IMPORTED_MODULE_5__.isFunction)(
              value.complete
            )
          );
        }
        function isSubscriber(value) {
          return (
            (value &&
              value instanceof
                _Subscriber__WEBPACK_IMPORTED_MODULE_0__.Subscriber) ||
            (isObserver(value) &&
              (0, _Subscription__WEBPACK_IMPORTED_MODULE_6__.isSubscription)(
                value
              ))
          );
        }
        //# sourceMappingURL=Observable.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/Subject.js":
      /*!**********************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/Subject.js ***!
  \**********************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ AnonymousSubject: () =>
            /* binding */ AnonymousSubject,
          /* harmony export */ Subject: () => /* binding */ Subject,
          /* harmony export */
        });
        /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! tslib */ "../node_modules/tslib/tslib.es6.js"
          );
        /* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(
            /*! ./Observable */ "../node_modules/rxjs/dist/esm5/internal/Observable.js"
          );
        /* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(
            /*! ./Subscription */ "../node_modules/rxjs/dist/esm5/internal/Subscription.js"
          );
        /* harmony import */ var _util_ObjectUnsubscribedError__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ./util/ObjectUnsubscribedError */ "../node_modules/rxjs/dist/esm5/internal/util/ObjectUnsubscribedError.js"
          );
        /* harmony import */ var _util_arrRemove__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(
            /*! ./util/arrRemove */ "../node_modules/rxjs/dist/esm5/internal/util/arrRemove.js"
          );
        /* harmony import */ var _util_errorContext__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! ./util/errorContext */ "../node_modules/rxjs/dist/esm5/internal/util/errorContext.js"
          );

        var Subject = (function (_super) {
          (0, tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(Subject, _super);
          function Subject() {
            var _this = _super.call(this) || this;
            _this.closed = false;
            _this.currentObservers = null;
            _this.observers = [];
            _this.isStopped = false;
            _this.hasError = false;
            _this.thrownError = null;
            return _this;
          }
          Subject.prototype.lift = function (operator) {
            var subject = new AnonymousSubject(this, this);
            subject.operator = operator;
            return subject;
          };
          Subject.prototype._throwIfClosed = function () {
            if (this.closed) {
              throw new _util_ObjectUnsubscribedError__WEBPACK_IMPORTED_MODULE_1__.ObjectUnsubscribedError();
            }
          };
          Subject.prototype.next = function (value) {
            var _this = this;
            (0, _util_errorContext__WEBPACK_IMPORTED_MODULE_2__.errorContext)(
              function () {
                var e_1, _a;
                _this._throwIfClosed();
                if (!_this.isStopped) {
                  if (!_this.currentObservers) {
                    _this.currentObservers = Array.from(_this.observers);
                  }
                  try {
                    for (
                      var _b = (0, tslib__WEBPACK_IMPORTED_MODULE_0__.__values)(
                          _this.currentObservers
                        ),
                        _c = _b.next();
                      !_c.done;
                      _c = _b.next()
                    ) {
                      var observer = _c.value;
                      observer.next(value);
                    }
                  } catch (e_1_1) {
                    e_1 = { error: e_1_1 };
                  } finally {
                    try {
                      if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    } finally {
                      if (e_1) throw e_1.error;
                    }
                  }
                }
              }
            );
          };
          Subject.prototype.error = function (err) {
            var _this = this;
            (0, _util_errorContext__WEBPACK_IMPORTED_MODULE_2__.errorContext)(
              function () {
                _this._throwIfClosed();
                if (!_this.isStopped) {
                  _this.hasError = _this.isStopped = true;
                  _this.thrownError = err;
                  var observers = _this.observers;
                  while (observers.length) {
                    observers.shift().error(err);
                  }
                }
              }
            );
          };
          Subject.prototype.complete = function () {
            var _this = this;
            (0, _util_errorContext__WEBPACK_IMPORTED_MODULE_2__.errorContext)(
              function () {
                _this._throwIfClosed();
                if (!_this.isStopped) {
                  _this.isStopped = true;
                  var observers = _this.observers;
                  while (observers.length) {
                    observers.shift().complete();
                  }
                }
              }
            );
          };
          Subject.prototype.unsubscribe = function () {
            this.isStopped = this.closed = true;
            this.observers = this.currentObservers = null;
          };
          Object.defineProperty(Subject.prototype, "observed", {
            get: function () {
              var _a;
              return (
                ((_a = this.observers) === null || _a === void 0
                  ? void 0
                  : _a.length) > 0
              );
            },
            enumerable: false,
            configurable: true,
          });
          Subject.prototype._trySubscribe = function (subscriber) {
            this._throwIfClosed();
            return _super.prototype._trySubscribe.call(this, subscriber);
          };
          Subject.prototype._subscribe = function (subscriber) {
            this._throwIfClosed();
            this._checkFinalizedStatuses(subscriber);
            return this._innerSubscribe(subscriber);
          };
          Subject.prototype._innerSubscribe = function (subscriber) {
            var _this = this;
            var _a = this,
              hasError = _a.hasError,
              isStopped = _a.isStopped,
              observers = _a.observers;
            if (hasError || isStopped) {
              return _Subscription__WEBPACK_IMPORTED_MODULE_3__.EMPTY_SUBSCRIPTION;
            }
            this.currentObservers = null;
            observers.push(subscriber);
            return new _Subscription__WEBPACK_IMPORTED_MODULE_3__.Subscription(
              function () {
                _this.currentObservers = null;
                (0, _util_arrRemove__WEBPACK_IMPORTED_MODULE_4__.arrRemove)(
                  observers,
                  subscriber
                );
              }
            );
          };
          Subject.prototype._checkFinalizedStatuses = function (subscriber) {
            var _a = this,
              hasError = _a.hasError,
              thrownError = _a.thrownError,
              isStopped = _a.isStopped;
            if (hasError) {
              subscriber.error(thrownError);
            } else if (isStopped) {
              subscriber.complete();
            }
          };
          Subject.prototype.asObservable = function () {
            var observable =
              new _Observable__WEBPACK_IMPORTED_MODULE_5__.Observable();
            observable.source = this;
            return observable;
          };
          Subject.create = function (destination, source) {
            return new AnonymousSubject(destination, source);
          };
          return Subject;
        })(_Observable__WEBPACK_IMPORTED_MODULE_5__.Observable);

        var AnonymousSubject = (function (_super) {
          (0, tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(
            AnonymousSubject,
            _super
          );
          function AnonymousSubject(destination, source) {
            var _this = _super.call(this) || this;
            _this.destination = destination;
            _this.source = source;
            return _this;
          }
          AnonymousSubject.prototype.next = function (value) {
            var _a, _b;
            (_b =
              (_a = this.destination) === null || _a === void 0
                ? void 0
                : _a.next) === null || _b === void 0
              ? void 0
              : _b.call(_a, value);
          };
          AnonymousSubject.prototype.error = function (err) {
            var _a, _b;
            (_b =
              (_a = this.destination) === null || _a === void 0
                ? void 0
                : _a.error) === null || _b === void 0
              ? void 0
              : _b.call(_a, err);
          };
          AnonymousSubject.prototype.complete = function () {
            var _a, _b;
            (_b =
              (_a = this.destination) === null || _a === void 0
                ? void 0
                : _a.complete) === null || _b === void 0
              ? void 0
              : _b.call(_a);
          };
          AnonymousSubject.prototype._subscribe = function (subscriber) {
            var _a, _b;
            return (_b =
              (_a = this.source) === null || _a === void 0
                ? void 0
                : _a.subscribe(subscriber)) !== null && _b !== void 0
              ? _b
              : _Subscription__WEBPACK_IMPORTED_MODULE_3__.EMPTY_SUBSCRIPTION;
          };
          return AnonymousSubject;
        })(Subject);

        //# sourceMappingURL=Subject.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/Subscriber.js":
      /*!*************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/Subscriber.js ***!
  \*************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ EMPTY_OBSERVER: () =>
            /* binding */ EMPTY_OBSERVER,
          /* harmony export */ SafeSubscriber: () =>
            /* binding */ SafeSubscriber,
          /* harmony export */ Subscriber: () => /* binding */ Subscriber,
          /* harmony export */
        });
        /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! tslib */ "../node_modules/tslib/tslib.es6.js"
          );
        /* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(
            /*! ./util/isFunction */ "../node_modules/rxjs/dist/esm5/internal/util/isFunction.js"
          );
        /* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ./Subscription */ "../node_modules/rxjs/dist/esm5/internal/Subscription.js"
          );
        /* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(
            /*! ./config */ "../node_modules/rxjs/dist/esm5/internal/config.js"
          );
        /* harmony import */ var _util_reportUnhandledError__WEBPACK_IMPORTED_MODULE_6__ =
          __webpack_require__(
            /*! ./util/reportUnhandledError */ "../node_modules/rxjs/dist/esm5/internal/util/reportUnhandledError.js"
          );
        /* harmony import */ var _util_noop__WEBPACK_IMPORTED_MODULE_8__ =
          __webpack_require__(
            /*! ./util/noop */ "../node_modules/rxjs/dist/esm5/internal/util/noop.js"
          );
        /* harmony import */ var _NotificationFactories__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! ./NotificationFactories */ "../node_modules/rxjs/dist/esm5/internal/NotificationFactories.js"
          );
        /* harmony import */ var _scheduler_timeoutProvider__WEBPACK_IMPORTED_MODULE_7__ =
          __webpack_require__(
            /*! ./scheduler/timeoutProvider */ "../node_modules/rxjs/dist/esm5/internal/scheduler/timeoutProvider.js"
          );
        /* harmony import */ var _util_errorContext__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(
            /*! ./util/errorContext */ "../node_modules/rxjs/dist/esm5/internal/util/errorContext.js"
          );

        var Subscriber = (function (_super) {
          (0, tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(Subscriber, _super);
          function Subscriber(destination) {
            var _this = _super.call(this) || this;
            _this.isStopped = false;
            if (destination) {
              _this.destination = destination;
              if (
                (0, _Subscription__WEBPACK_IMPORTED_MODULE_1__.isSubscription)(
                  destination
                )
              ) {
                destination.add(_this);
              }
            } else {
              _this.destination = EMPTY_OBSERVER;
            }
            return _this;
          }
          Subscriber.create = function (next, error, complete) {
            return new SafeSubscriber(next, error, complete);
          };
          Subscriber.prototype.next = function (value) {
            if (this.isStopped) {
              handleStoppedNotification(
                (0,
                _NotificationFactories__WEBPACK_IMPORTED_MODULE_2__.nextNotification)(
                  value
                ),
                this
              );
            } else {
              this._next(value);
            }
          };
          Subscriber.prototype.error = function (err) {
            if (this.isStopped) {
              handleStoppedNotification(
                (0,
                _NotificationFactories__WEBPACK_IMPORTED_MODULE_2__.errorNotification)(
                  err
                ),
                this
              );
            } else {
              this.isStopped = true;
              this._error(err);
            }
          };
          Subscriber.prototype.complete = function () {
            if (this.isStopped) {
              handleStoppedNotification(
                _NotificationFactories__WEBPACK_IMPORTED_MODULE_2__.COMPLETE_NOTIFICATION,
                this
              );
            } else {
              this.isStopped = true;
              this._complete();
            }
          };
          Subscriber.prototype.unsubscribe = function () {
            if (!this.closed) {
              this.isStopped = true;
              _super.prototype.unsubscribe.call(this);
              this.destination = null;
            }
          };
          Subscriber.prototype._next = function (value) {
            this.destination.next(value);
          };
          Subscriber.prototype._error = function (err) {
            try {
              this.destination.error(err);
            } finally {
              this.unsubscribe();
            }
          };
          Subscriber.prototype._complete = function () {
            try {
              this.destination.complete();
            } finally {
              this.unsubscribe();
            }
          };
          return Subscriber;
        })(_Subscription__WEBPACK_IMPORTED_MODULE_1__.Subscription);

        var _bind = Function.prototype.bind;
        function bind(fn, thisArg) {
          return _bind.call(fn, thisArg);
        }
        var ConsumerObserver = (function () {
          function ConsumerObserver(partialObserver) {
            this.partialObserver = partialObserver;
          }
          ConsumerObserver.prototype.next = function (value) {
            var partialObserver = this.partialObserver;
            if (partialObserver.next) {
              try {
                partialObserver.next(value);
              } catch (error) {
                handleUnhandledError(error);
              }
            }
          };
          ConsumerObserver.prototype.error = function (err) {
            var partialObserver = this.partialObserver;
            if (partialObserver.error) {
              try {
                partialObserver.error(err);
              } catch (error) {
                handleUnhandledError(error);
              }
            } else {
              handleUnhandledError(err);
            }
          };
          ConsumerObserver.prototype.complete = function () {
            var partialObserver = this.partialObserver;
            if (partialObserver.complete) {
              try {
                partialObserver.complete();
              } catch (error) {
                handleUnhandledError(error);
              }
            }
          };
          return ConsumerObserver;
        })();
        var SafeSubscriber = (function (_super) {
          (0, tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(
            SafeSubscriber,
            _super
          );
          function SafeSubscriber(observerOrNext, error, complete) {
            var _this = _super.call(this) || this;
            var partialObserver;
            if (
              (0, _util_isFunction__WEBPACK_IMPORTED_MODULE_3__.isFunction)(
                observerOrNext
              ) ||
              !observerOrNext
            ) {
              partialObserver = {
                next:
                  observerOrNext !== null && observerOrNext !== void 0
                    ? observerOrNext
                    : undefined,
                error: error !== null && error !== void 0 ? error : undefined,
                complete:
                  complete !== null && complete !== void 0
                    ? complete
                    : undefined,
              };
            } else {
              var context_1;
              if (
                _this &&
                _config__WEBPACK_IMPORTED_MODULE_4__.config
                  .useDeprecatedNextContext
              ) {
                context_1 = Object.create(observerOrNext);
                context_1.unsubscribe = function () {
                  return _this.unsubscribe();
                };
                partialObserver = {
                  next:
                    observerOrNext.next && bind(observerOrNext.next, context_1),
                  error:
                    observerOrNext.error &&
                    bind(observerOrNext.error, context_1),
                  complete:
                    observerOrNext.complete &&
                    bind(observerOrNext.complete, context_1),
                };
              } else {
                partialObserver = observerOrNext;
              }
            }
            _this.destination = new ConsumerObserver(partialObserver);
            return _this;
          }
          return SafeSubscriber;
        })(Subscriber);

        function handleUnhandledError(error) {
          if (
            _config__WEBPACK_IMPORTED_MODULE_4__.config
              .useDeprecatedSynchronousErrorHandling
          ) {
            (0, _util_errorContext__WEBPACK_IMPORTED_MODULE_5__.captureError)(
              error
            );
          } else {
            (0,
            _util_reportUnhandledError__WEBPACK_IMPORTED_MODULE_6__.reportUnhandledError)(
              error
            );
          }
        }
        function defaultErrorHandler(err) {
          throw err;
        }
        function handleStoppedNotification(notification, subscriber) {
          var onStoppedNotification =
            _config__WEBPACK_IMPORTED_MODULE_4__.config.onStoppedNotification;
          onStoppedNotification &&
            _scheduler_timeoutProvider__WEBPACK_IMPORTED_MODULE_7__.timeoutProvider.setTimeout(
              function () {
                return onStoppedNotification(notification, subscriber);
              }
            );
        }
        var EMPTY_OBSERVER = {
          closed: true,
          next: _util_noop__WEBPACK_IMPORTED_MODULE_8__.noop,
          error: defaultErrorHandler,
          complete: _util_noop__WEBPACK_IMPORTED_MODULE_8__.noop,
        };
        //# sourceMappingURL=Subscriber.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/Subscription.js":
      /*!***************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/Subscription.js ***!
  \***************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ EMPTY_SUBSCRIPTION: () =>
            /* binding */ EMPTY_SUBSCRIPTION,
          /* harmony export */ Subscription: () => /* binding */ Subscription,
          /* harmony export */ isSubscription: () =>
            /* binding */ isSubscription,
          /* harmony export */
        });
        /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! tslib */ "../node_modules/tslib/tslib.es6.js"
          );
        /* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ./util/isFunction */ "../node_modules/rxjs/dist/esm5/internal/util/isFunction.js"
          );
        /* harmony import */ var _util_UnsubscriptionError__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! ./util/UnsubscriptionError */ "../node_modules/rxjs/dist/esm5/internal/util/UnsubscriptionError.js"
          );
        /* harmony import */ var _util_arrRemove__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(
            /*! ./util/arrRemove */ "../node_modules/rxjs/dist/esm5/internal/util/arrRemove.js"
          );

        var Subscription = (function () {
          function Subscription(initialTeardown) {
            this.initialTeardown = initialTeardown;
            this.closed = false;
            this._parentage = null;
            this._finalizers = null;
          }
          Subscription.prototype.unsubscribe = function () {
            var e_1, _a, e_2, _b;
            var errors;
            if (!this.closed) {
              this.closed = true;
              var _parentage = this._parentage;
              if (_parentage) {
                this._parentage = null;
                if (Array.isArray(_parentage)) {
                  try {
                    for (
                      var _parentage_1 = (0,
                        tslib__WEBPACK_IMPORTED_MODULE_0__.__values)(
                          _parentage
                        ),
                        _parentage_1_1 = _parentage_1.next();
                      !_parentage_1_1.done;
                      _parentage_1_1 = _parentage_1.next()
                    ) {
                      var parent_1 = _parentage_1_1.value;
                      parent_1.remove(this);
                    }
                  } catch (e_1_1) {
                    e_1 = { error: e_1_1 };
                  } finally {
                    try {
                      if (
                        _parentage_1_1 &&
                        !_parentage_1_1.done &&
                        (_a = _parentage_1.return)
                      )
                        _a.call(_parentage_1);
                    } finally {
                      if (e_1) throw e_1.error;
                    }
                  }
                } else {
                  _parentage.remove(this);
                }
              }
              var initialFinalizer = this.initialTeardown;
              if (
                (0, _util_isFunction__WEBPACK_IMPORTED_MODULE_1__.isFunction)(
                  initialFinalizer
                )
              ) {
                try {
                  initialFinalizer();
                } catch (e) {
                  errors =
                    e instanceof
                    _util_UnsubscriptionError__WEBPACK_IMPORTED_MODULE_2__.UnsubscriptionError
                      ? e.errors
                      : [e];
                }
              }
              var _finalizers = this._finalizers;
              if (_finalizers) {
                this._finalizers = null;
                try {
                  for (
                    var _finalizers_1 = (0,
                      tslib__WEBPACK_IMPORTED_MODULE_0__.__values)(_finalizers),
                      _finalizers_1_1 = _finalizers_1.next();
                    !_finalizers_1_1.done;
                    _finalizers_1_1 = _finalizers_1.next()
                  ) {
                    var finalizer = _finalizers_1_1.value;
                    try {
                      execFinalizer(finalizer);
                    } catch (err) {
                      errors =
                        errors !== null && errors !== void 0 ? errors : [];
                      if (
                        err instanceof
                        _util_UnsubscriptionError__WEBPACK_IMPORTED_MODULE_2__.UnsubscriptionError
                      ) {
                        errors = (0,
                        tslib__WEBPACK_IMPORTED_MODULE_0__.__spreadArray)(
                          (0, tslib__WEBPACK_IMPORTED_MODULE_0__.__spreadArray)(
                            [],
                            (0, tslib__WEBPACK_IMPORTED_MODULE_0__.__read)(
                              errors
                            )
                          ),
                          (0, tslib__WEBPACK_IMPORTED_MODULE_0__.__read)(
                            err.errors
                          )
                        );
                      } else {
                        errors.push(err);
                      }
                    }
                  }
                } catch (e_2_1) {
                  e_2 = { error: e_2_1 };
                } finally {
                  try {
                    if (
                      _finalizers_1_1 &&
                      !_finalizers_1_1.done &&
                      (_b = _finalizers_1.return)
                    )
                      _b.call(_finalizers_1);
                  } finally {
                    if (e_2) throw e_2.error;
                  }
                }
              }
              if (errors) {
                throw new _util_UnsubscriptionError__WEBPACK_IMPORTED_MODULE_2__.UnsubscriptionError(
                  errors
                );
              }
            }
          };
          Subscription.prototype.add = function (teardown) {
            var _a;
            if (teardown && teardown !== this) {
              if (this.closed) {
                execFinalizer(teardown);
              } else {
                if (teardown instanceof Subscription) {
                  if (teardown.closed || teardown._hasParent(this)) {
                    return;
                  }
                  teardown._addParent(this);
                }
                (this._finalizers =
                  (_a = this._finalizers) !== null && _a !== void 0
                    ? _a
                    : []).push(teardown);
              }
            }
          };
          Subscription.prototype._hasParent = function (parent) {
            var _parentage = this._parentage;
            return (
              _parentage === parent ||
              (Array.isArray(_parentage) && _parentage.includes(parent))
            );
          };
          Subscription.prototype._addParent = function (parent) {
            var _parentage = this._parentage;
            this._parentage = Array.isArray(_parentage)
              ? (_parentage.push(parent), _parentage)
              : _parentage
              ? [_parentage, parent]
              : parent;
          };
          Subscription.prototype._removeParent = function (parent) {
            var _parentage = this._parentage;
            if (_parentage === parent) {
              this._parentage = null;
            } else if (Array.isArray(_parentage)) {
              (0, _util_arrRemove__WEBPACK_IMPORTED_MODULE_3__.arrRemove)(
                _parentage,
                parent
              );
            }
          };
          Subscription.prototype.remove = function (teardown) {
            var _finalizers = this._finalizers;
            _finalizers &&
              (0, _util_arrRemove__WEBPACK_IMPORTED_MODULE_3__.arrRemove)(
                _finalizers,
                teardown
              );
            if (teardown instanceof Subscription) {
              teardown._removeParent(this);
            }
          };
          Subscription.EMPTY = (function () {
            var empty = new Subscription();
            empty.closed = true;
            return empty;
          })();
          return Subscription;
        })();

        var EMPTY_SUBSCRIPTION = Subscription.EMPTY;
        function isSubscription(value) {
          return (
            value instanceof Subscription ||
            (value &&
              "closed" in value &&
              (0, _util_isFunction__WEBPACK_IMPORTED_MODULE_1__.isFunction)(
                value.remove
              ) &&
              (0, _util_isFunction__WEBPACK_IMPORTED_MODULE_1__.isFunction)(
                value.add
              ) &&
              (0, _util_isFunction__WEBPACK_IMPORTED_MODULE_1__.isFunction)(
                value.unsubscribe
              ))
          );
        }
        function execFinalizer(finalizer) {
          if (
            (0, _util_isFunction__WEBPACK_IMPORTED_MODULE_1__.isFunction)(
              finalizer
            )
          ) {
            finalizer();
          } else {
            finalizer.unsubscribe();
          }
        }
        //# sourceMappingURL=Subscription.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/config.js":
      /*!*********************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/config.js ***!
  \*********************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ config: () => /* binding */ config,
          /* harmony export */
        });
        var config = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: undefined,
          useDeprecatedSynchronousErrorHandling: false,
          useDeprecatedNextContext: false,
        };
        //# sourceMappingURL=config.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/observable/empty.js":
      /*!*******************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/observable/empty.js ***!
  \*******************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ EMPTY: () => /* binding */ EMPTY,
          /* harmony export */ empty: () => /* binding */ empty,
          /* harmony export */
        });
        /* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ../Observable */ "../node_modules/rxjs/dist/esm5/internal/Observable.js"
          );

        var EMPTY = new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(
          function (subscriber) {
            return subscriber.complete();
          }
        );
        function empty(scheduler) {
          return scheduler ? emptyScheduled(scheduler) : EMPTY;
        }
        function emptyScheduled(scheduler) {
          return new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(
            function (subscriber) {
              return scheduler.schedule(function () {
                return subscriber.complete();
              });
            }
          );
        }
        //# sourceMappingURL=empty.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/observable/fromEvent.js":
      /*!***********************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/observable/fromEvent.js ***!
  \***********************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ fromEvent: () => /* binding */ fromEvent,
          /* harmony export */
        });
        /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! tslib */ "../node_modules/tslib/tslib.es6.js"
          );
        /* harmony import */ var _observable_innerFrom__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(
            /*! ../observable/innerFrom */ "../node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js"
          );
        /* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_6__ =
          __webpack_require__(
            /*! ../Observable */ "../node_modules/rxjs/dist/esm5/internal/Observable.js"
          );
        /* harmony import */ var _operators_mergeMap__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(
            /*! ../operators/mergeMap */ "../node_modules/rxjs/dist/esm5/internal/operators/mergeMap.js"
          );
        /* harmony import */ var _util_isArrayLike__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(
            /*! ../util/isArrayLike */ "../node_modules/rxjs/dist/esm5/internal/util/isArrayLike.js"
          );
        /* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ../util/isFunction */ "../node_modules/rxjs/dist/esm5/internal/util/isFunction.js"
          );
        /* harmony import */ var _util_mapOneOrManyArgs__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ../util/mapOneOrManyArgs */ "../node_modules/rxjs/dist/esm5/internal/util/mapOneOrManyArgs.js"
          );

        var nodeEventEmitterMethods = ["addListener", "removeListener"];
        var eventTargetMethods = ["addEventListener", "removeEventListener"];
        var jqueryMethods = ["on", "off"];
        function fromEvent(target, eventName, options, resultSelector) {
          if (
            (0, _util_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(
              options
            )
          ) {
            resultSelector = options;
            options = undefined;
          }
          if (resultSelector) {
            return fromEvent(target, eventName, options).pipe(
              (0,
              _util_mapOneOrManyArgs__WEBPACK_IMPORTED_MODULE_1__.mapOneOrManyArgs)(
                resultSelector
              )
            );
          }
          var _a = (0, tslib__WEBPACK_IMPORTED_MODULE_2__.__read)(
              isEventTarget(target)
                ? eventTargetMethods.map(function (methodName) {
                    return function (handler) {
                      return target[methodName](eventName, handler, options);
                    };
                  })
                : isNodeStyleEventEmitter(target)
                ? nodeEventEmitterMethods.map(
                    toCommonHandlerRegistry(target, eventName)
                  )
                : isJQueryStyleEventEmitter(target)
                ? jqueryMethods.map(toCommonHandlerRegistry(target, eventName))
                : [],
              2
            ),
            add = _a[0],
            remove = _a[1];
          if (!add) {
            if (
              (0, _util_isArrayLike__WEBPACK_IMPORTED_MODULE_3__.isArrayLike)(
                target
              )
            ) {
              return (0,
              _operators_mergeMap__WEBPACK_IMPORTED_MODULE_4__.mergeMap)(
                function (subTarget) {
                  return fromEvent(subTarget, eventName, options);
                }
              )(
                (0,
                _observable_innerFrom__WEBPACK_IMPORTED_MODULE_5__.innerFrom)(
                  target
                )
              );
            }
          }
          if (!add) {
            throw new TypeError("Invalid event target");
          }
          return new _Observable__WEBPACK_IMPORTED_MODULE_6__.Observable(
            function (subscriber) {
              var handler = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                  args[_i] = arguments[_i];
                }
                return subscriber.next(1 < args.length ? args : args[0]);
              };
              add(handler);
              return function () {
                return remove(handler);
              };
            }
          );
        }
        function toCommonHandlerRegistry(target, eventName) {
          return function (methodName) {
            return function (handler) {
              return target[methodName](eventName, handler);
            };
          };
        }
        function isNodeStyleEventEmitter(target) {
          return (
            (0, _util_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(
              target.addListener
            ) &&
            (0, _util_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(
              target.removeListener
            )
          );
        }
        function isJQueryStyleEventEmitter(target) {
          return (
            (0, _util_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(
              target.on
            ) &&
            (0, _util_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(
              target.off
            )
          );
        }
        function isEventTarget(target) {
          return (
            (0, _util_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(
              target.addEventListener
            ) &&
            (0, _util_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(
              target.removeEventListener
            )
          );
        }
        //# sourceMappingURL=fromEvent.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/observable/fromEventPattern.js":
      /*!******************************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/observable/fromEventPattern.js ***!
  \******************************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ fromEventPattern: () =>
            /* binding */ fromEventPattern,
          /* harmony export */
        });
        /* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ../Observable */ "../node_modules/rxjs/dist/esm5/internal/Observable.js"
          );
        /* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! ../util/isFunction */ "../node_modules/rxjs/dist/esm5/internal/util/isFunction.js"
          );
        /* harmony import */ var _util_mapOneOrManyArgs__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ../util/mapOneOrManyArgs */ "../node_modules/rxjs/dist/esm5/internal/util/mapOneOrManyArgs.js"
          );

        function fromEventPattern(addHandler, removeHandler, resultSelector) {
          if (resultSelector) {
            return fromEventPattern(addHandler, removeHandler).pipe(
              (0,
              _util_mapOneOrManyArgs__WEBPACK_IMPORTED_MODULE_0__.mapOneOrManyArgs)(
                resultSelector
              )
            );
          }
          return new _Observable__WEBPACK_IMPORTED_MODULE_1__.Observable(
            function (subscriber) {
              var handler = function () {
                var e = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                  e[_i] = arguments[_i];
                }
                return subscriber.next(e.length === 1 ? e[0] : e);
              };
              var retValue = addHandler(handler);
              return (0,
              _util_isFunction__WEBPACK_IMPORTED_MODULE_2__.isFunction)(
                removeHandler
              )
                ? function () {
                    return removeHandler(handler, retValue);
                  }
                : undefined;
            }
          );
        }
        //# sourceMappingURL=fromEventPattern.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js":
      /*!***********************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js ***!
  \***********************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ fromArrayLike: () => /* binding */ fromArrayLike,
          /* harmony export */ fromAsyncIterable: () =>
            /* binding */ fromAsyncIterable,
          /* harmony export */ fromInteropObservable: () =>
            /* binding */ fromInteropObservable,
          /* harmony export */ fromIterable: () => /* binding */ fromIterable,
          /* harmony export */ fromPromise: () => /* binding */ fromPromise,
          /* harmony export */ fromReadableStreamLike: () =>
            /* binding */ fromReadableStreamLike,
          /* harmony export */ innerFrom: () => /* binding */ innerFrom,
          /* harmony export */
        });
        /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_11__ =
          __webpack_require__(
            /*! tslib */ "../node_modules/tslib/tslib.es6.js"
          );
        /* harmony import */ var _util_isArrayLike__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! ../util/isArrayLike */ "../node_modules/rxjs/dist/esm5/internal/util/isArrayLike.js"
          );
        /* harmony import */ var _util_isPromise__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(
            /*! ../util/isPromise */ "../node_modules/rxjs/dist/esm5/internal/util/isPromise.js"
          );
        /* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ../Observable */ "../node_modules/rxjs/dist/esm5/internal/Observable.js"
          );
        /* harmony import */ var _util_isInteropObservable__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ../util/isInteropObservable */ "../node_modules/rxjs/dist/esm5/internal/util/isInteropObservable.js"
          );
        /* harmony import */ var _util_isAsyncIterable__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(
            /*! ../util/isAsyncIterable */ "../node_modules/rxjs/dist/esm5/internal/util/isAsyncIterable.js"
          );
        /* harmony import */ var _util_throwUnobservableError__WEBPACK_IMPORTED_MODULE_7__ =
          __webpack_require__(
            /*! ../util/throwUnobservableError */ "../node_modules/rxjs/dist/esm5/internal/util/throwUnobservableError.js"
          );
        /* harmony import */ var _util_isIterable__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(
            /*! ../util/isIterable */ "../node_modules/rxjs/dist/esm5/internal/util/isIterable.js"
          );
        /* harmony import */ var _util_isReadableStreamLike__WEBPACK_IMPORTED_MODULE_6__ =
          __webpack_require__(
            /*! ../util/isReadableStreamLike */ "../node_modules/rxjs/dist/esm5/internal/util/isReadableStreamLike.js"
          );
        /* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_9__ =
          __webpack_require__(
            /*! ../util/isFunction */ "../node_modules/rxjs/dist/esm5/internal/util/isFunction.js"
          );
        /* harmony import */ var _util_reportUnhandledError__WEBPACK_IMPORTED_MODULE_10__ =
          __webpack_require__(
            /*! ../util/reportUnhandledError */ "../node_modules/rxjs/dist/esm5/internal/util/reportUnhandledError.js"
          );
        /* harmony import */ var _symbol_observable__WEBPACK_IMPORTED_MODULE_8__ =
          __webpack_require__(
            /*! ../symbol/observable */ "../node_modules/rxjs/dist/esm5/internal/symbol/observable.js"
          );

        function innerFrom(input) {
          if (
            input instanceof _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable
          ) {
            return input;
          }
          if (input != null) {
            if (
              (0,
              _util_isInteropObservable__WEBPACK_IMPORTED_MODULE_1__.isInteropObservable)(
                input
              )
            ) {
              return fromInteropObservable(input);
            }
            if (
              (0, _util_isArrayLike__WEBPACK_IMPORTED_MODULE_2__.isArrayLike)(
                input
              )
            ) {
              return fromArrayLike(input);
            }
            if (
              (0, _util_isPromise__WEBPACK_IMPORTED_MODULE_3__.isPromise)(input)
            ) {
              return fromPromise(input);
            }
            if (
              (0,
              _util_isAsyncIterable__WEBPACK_IMPORTED_MODULE_4__.isAsyncIterable)(
                input
              )
            ) {
              return fromAsyncIterable(input);
            }
            if (
              (0, _util_isIterable__WEBPACK_IMPORTED_MODULE_5__.isIterable)(
                input
              )
            ) {
              return fromIterable(input);
            }
            if (
              (0,
              _util_isReadableStreamLike__WEBPACK_IMPORTED_MODULE_6__.isReadableStreamLike)(
                input
              )
            ) {
              return fromReadableStreamLike(input);
            }
          }
          throw (0,
          _util_throwUnobservableError__WEBPACK_IMPORTED_MODULE_7__.createInvalidObservableTypeError)(
            input
          );
        }
        function fromInteropObservable(obj) {
          return new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(
            function (subscriber) {
              var obs =
                obj[
                  _symbol_observable__WEBPACK_IMPORTED_MODULE_8__.observable
                ]();
              if (
                (0, _util_isFunction__WEBPACK_IMPORTED_MODULE_9__.isFunction)(
                  obs.subscribe
                )
              ) {
                return obs.subscribe(subscriber);
              }
              throw new TypeError(
                "Provided object does not correctly implement Symbol.observable"
              );
            }
          );
        }
        function fromArrayLike(array) {
          return new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(
            function (subscriber) {
              for (var i = 0; i < array.length && !subscriber.closed; i++) {
                subscriber.next(array[i]);
              }
              subscriber.complete();
            }
          );
        }
        function fromPromise(promise) {
          return new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(
            function (subscriber) {
              promise
                .then(
                  function (value) {
                    if (!subscriber.closed) {
                      subscriber.next(value);
                      subscriber.complete();
                    }
                  },
                  function (err) {
                    return subscriber.error(err);
                  }
                )
                .then(
                  null,
                  _util_reportUnhandledError__WEBPACK_IMPORTED_MODULE_10__.reportUnhandledError
                );
            }
          );
        }
        function fromIterable(iterable) {
          return new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(
            function (subscriber) {
              var e_1, _a;
              try {
                for (
                  var iterable_1 = (0,
                    tslib__WEBPACK_IMPORTED_MODULE_11__.__values)(iterable),
                    iterable_1_1 = iterable_1.next();
                  !iterable_1_1.done;
                  iterable_1_1 = iterable_1.next()
                ) {
                  var value = iterable_1_1.value;
                  subscriber.next(value);
                  if (subscriber.closed) {
                    return;
                  }
                }
              } catch (e_1_1) {
                e_1 = { error: e_1_1 };
              } finally {
                try {
                  if (
                    iterable_1_1 &&
                    !iterable_1_1.done &&
                    (_a = iterable_1.return)
                  )
                    _a.call(iterable_1);
                } finally {
                  if (e_1) throw e_1.error;
                }
              }
              subscriber.complete();
            }
          );
        }
        function fromAsyncIterable(asyncIterable) {
          return new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(
            function (subscriber) {
              process(asyncIterable, subscriber).catch(function (err) {
                return subscriber.error(err);
              });
            }
          );
        }
        function fromReadableStreamLike(readableStream) {
          return fromAsyncIterable(
            (0,
            _util_isReadableStreamLike__WEBPACK_IMPORTED_MODULE_6__.readableStreamLikeToAsyncGenerator)(
              readableStream
            )
          );
        }
        function process(asyncIterable, subscriber) {
          var asyncIterable_1, asyncIterable_1_1;
          var e_2, _a;
          return (0, tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(
            this,
            void 0,
            void 0,
            function () {
              var value, e_2_1;
              return (0, tslib__WEBPACK_IMPORTED_MODULE_11__.__generator)(
                this,
                function (_b) {
                  switch (_b.label) {
                    case 0:
                      _b.trys.push([0, 5, 6, 11]);
                      asyncIterable_1 = (0,
                      tslib__WEBPACK_IMPORTED_MODULE_11__.__asyncValues)(
                        asyncIterable
                      );
                      _b.label = 1;
                    case 1:
                      return [4, asyncIterable_1.next()];
                    case 2:
                      if (
                        !((asyncIterable_1_1 = _b.sent()),
                        !asyncIterable_1_1.done)
                      )
                        return [3, 4];
                      value = asyncIterable_1_1.value;
                      subscriber.next(value);
                      if (subscriber.closed) {
                        return [2];
                      }
                      _b.label = 3;
                    case 3:
                      return [3, 1];
                    case 4:
                      return [3, 11];
                    case 5:
                      e_2_1 = _b.sent();
                      e_2 = { error: e_2_1 };
                      return [3, 11];
                    case 6:
                      _b.trys.push([6, , 9, 10]);
                      if (
                        !(
                          asyncIterable_1_1 &&
                          !asyncIterable_1_1.done &&
                          (_a = asyncIterable_1.return)
                        )
                      )
                        return [3, 8];
                      return [4, _a.call(asyncIterable_1)];
                    case 7:
                      _b.sent();
                      _b.label = 8;
                    case 8:
                      return [3, 10];
                    case 9:
                      if (e_2) throw e_2.error;
                      return [7];
                    case 10:
                      return [7];
                    case 11:
                      subscriber.complete();
                      return [2];
                  }
                }
              );
            }
          );
        }
        //# sourceMappingURL=innerFrom.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js":
      /*!*******************************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js ***!
  \*******************************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ OperatorSubscriber: () =>
            /* binding */ OperatorSubscriber,
          /* harmony export */ createOperatorSubscriber: () =>
            /* binding */ createOperatorSubscriber,
          /* harmony export */
        });
        /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! tslib */ "../node_modules/tslib/tslib.es6.js"
          );
        /* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ../Subscriber */ "../node_modules/rxjs/dist/esm5/internal/Subscriber.js"
          );

        function createOperatorSubscriber(
          destination,
          onNext,
          onComplete,
          onError,
          onFinalize
        ) {
          return new OperatorSubscriber(
            destination,
            onNext,
            onComplete,
            onError,
            onFinalize
          );
        }
        var OperatorSubscriber = (function (_super) {
          (0, tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(
            OperatorSubscriber,
            _super
          );
          function OperatorSubscriber(
            destination,
            onNext,
            onComplete,
            onError,
            onFinalize,
            shouldUnsubscribe
          ) {
            var _this = _super.call(this, destination) || this;
            _this.onFinalize = onFinalize;
            _this.shouldUnsubscribe = shouldUnsubscribe;
            _this._next = onNext
              ? function (value) {
                  try {
                    onNext(value);
                  } catch (err) {
                    destination.error(err);
                  }
                }
              : _super.prototype._next;
            _this._error = onError
              ? function (err) {
                  try {
                    onError(err);
                  } catch (err) {
                    destination.error(err);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : _super.prototype._error;
            _this._complete = onComplete
              ? function () {
                  try {
                    onComplete();
                  } catch (err) {
                    destination.error(err);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : _super.prototype._complete;
            return _this;
          }
          OperatorSubscriber.prototype.unsubscribe = function () {
            var _a;
            if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
              var closed_1 = this.closed;
              _super.prototype.unsubscribe.call(this);
              !closed_1 &&
                ((_a = this.onFinalize) === null || _a === void 0
                  ? void 0
                  : _a.call(this));
            }
          };
          return OperatorSubscriber;
        })(_Subscriber__WEBPACK_IMPORTED_MODULE_1__.Subscriber);

        //# sourceMappingURL=OperatorSubscriber.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/operators/filter.js":
      /*!*******************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/operators/filter.js ***!
  \*******************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ filter: () => /* binding */ filter,
          /* harmony export */
        });
        /* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ../util/lift */ "../node_modules/rxjs/dist/esm5/internal/util/lift.js"
          );
        /* harmony import */ var _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ./OperatorSubscriber */ "../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js"
          );

        function filter(predicate, thisArg) {
          return (0, _util_lift__WEBPACK_IMPORTED_MODULE_0__.operate)(function (
            source,
            subscriber
          ) {
            var index = 0;
            source.subscribe(
              (0,
              _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__.createOperatorSubscriber)(
                subscriber,
                function (value) {
                  return (
                    predicate.call(thisArg, value, index++) &&
                    subscriber.next(value)
                  );
                }
              )
            );
          });
        }
        //# sourceMappingURL=filter.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/operators/map.js":
      /*!****************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/operators/map.js ***!
  \****************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ map: () => /* binding */ map,
          /* harmony export */
        });
        /* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ../util/lift */ "../node_modules/rxjs/dist/esm5/internal/util/lift.js"
          );
        /* harmony import */ var _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ./OperatorSubscriber */ "../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js"
          );

        function map(project, thisArg) {
          return (0, _util_lift__WEBPACK_IMPORTED_MODULE_0__.operate)(function (
            source,
            subscriber
          ) {
            var index = 0;
            source.subscribe(
              (0,
              _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__.createOperatorSubscriber)(
                subscriber,
                function (value) {
                  subscriber.next(project.call(thisArg, value, index++));
                }
              )
            );
          });
        }
        //# sourceMappingURL=map.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/operators/mergeInternals.js":
      /*!***************************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/operators/mergeInternals.js ***!
  \***************************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ mergeInternals: () =>
            /* binding */ mergeInternals,
          /* harmony export */
        });
        /* harmony import */ var _observable_innerFrom__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ../observable/innerFrom */ "../node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js"
          );
        /* harmony import */ var _util_executeSchedule__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! ../util/executeSchedule */ "../node_modules/rxjs/dist/esm5/internal/util/executeSchedule.js"
          );
        /* harmony import */ var _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ./OperatorSubscriber */ "../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js"
          );

        function mergeInternals(
          source,
          subscriber,
          project,
          concurrent,
          onBeforeNext,
          expand,
          innerSubScheduler,
          additionalFinalizer
        ) {
          var buffer = [];
          var active = 0;
          var index = 0;
          var isComplete = false;
          var checkComplete = function () {
            if (isComplete && !buffer.length && !active) {
              subscriber.complete();
            }
          };
          var outerNext = function (value) {
            return active < concurrent ? doInnerSub(value) : buffer.push(value);
          };
          var doInnerSub = function (value) {
            expand && subscriber.next(value);
            active++;
            var innerComplete = false;
            (0, _observable_innerFrom__WEBPACK_IMPORTED_MODULE_0__.innerFrom)(
              project(value, index++)
            ).subscribe(
              (0,
              _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__.createOperatorSubscriber)(
                subscriber,
                function (innerValue) {
                  onBeforeNext === null || onBeforeNext === void 0
                    ? void 0
                    : onBeforeNext(innerValue);
                  if (expand) {
                    outerNext(innerValue);
                  } else {
                    subscriber.next(innerValue);
                  }
                },
                function () {
                  innerComplete = true;
                },
                undefined,
                function () {
                  if (innerComplete) {
                    try {
                      active--;
                      var _loop_1 = function () {
                        var bufferedValue = buffer.shift();
                        if (innerSubScheduler) {
                          (0,
                          _util_executeSchedule__WEBPACK_IMPORTED_MODULE_2__.executeSchedule)(
                            subscriber,
                            innerSubScheduler,
                            function () {
                              return doInnerSub(bufferedValue);
                            }
                          );
                        } else {
                          doInnerSub(bufferedValue);
                        }
                      };
                      while (buffer.length && active < concurrent) {
                        _loop_1();
                      }
                      checkComplete();
                    } catch (err) {
                      subscriber.error(err);
                    }
                  }
                }
              )
            );
          };
          source.subscribe(
            (0,
            _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__.createOperatorSubscriber)(
              subscriber,
              outerNext,
              function () {
                isComplete = true;
                checkComplete();
              }
            )
          );
          return function () {
            additionalFinalizer === null || additionalFinalizer === void 0
              ? void 0
              : additionalFinalizer();
          };
        }
        //# sourceMappingURL=mergeInternals.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/operators/mergeMap.js":
      /*!*********************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/operators/mergeMap.js ***!
  \*********************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ mergeMap: () => /* binding */ mergeMap,
          /* harmony export */
        });
        /* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ./map */ "../node_modules/rxjs/dist/esm5/internal/operators/map.js"
          );
        /* harmony import */ var _observable_innerFrom__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! ../observable/innerFrom */ "../node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js"
          );
        /* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(
            /*! ../util/lift */ "../node_modules/rxjs/dist/esm5/internal/util/lift.js"
          );
        /* harmony import */ var _mergeInternals__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(
            /*! ./mergeInternals */ "../node_modules/rxjs/dist/esm5/internal/operators/mergeInternals.js"
          );
        /* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ../util/isFunction */ "../node_modules/rxjs/dist/esm5/internal/util/isFunction.js"
          );

        function mergeMap(project, resultSelector, concurrent) {
          if (concurrent === void 0) {
            concurrent = Infinity;
          }
          if (
            (0, _util_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(
              resultSelector
            )
          ) {
            return mergeMap(function (a, i) {
              return (0, _map__WEBPACK_IMPORTED_MODULE_1__.map)(function (
                b,
                ii
              ) {
                return resultSelector(a, b, i, ii);
              })(
                (0,
                _observable_innerFrom__WEBPACK_IMPORTED_MODULE_2__.innerFrom)(
                  project(a, i)
                )
              );
            }, concurrent);
          } else if (typeof resultSelector === "number") {
            concurrent = resultSelector;
          }
          return (0, _util_lift__WEBPACK_IMPORTED_MODULE_3__.operate)(function (
            source,
            subscriber
          ) {
            return (0,
            _mergeInternals__WEBPACK_IMPORTED_MODULE_4__.mergeInternals)(
              source,
              subscriber,
              project,
              concurrent
            );
          });
        }
        //# sourceMappingURL=mergeMap.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/operators/share.js":
      /*!******************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/operators/share.js ***!
  \******************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ share: () => /* binding */ share,
          /* harmony export */
        });
        /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(
            /*! tslib */ "../node_modules/tslib/tslib.es6.js"
          );
        /* harmony import */ var _observable_innerFrom__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(
            /*! ../observable/innerFrom */ "../node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js"
          );
        /* harmony import */ var _Subject__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ../Subject */ "../node_modules/rxjs/dist/esm5/internal/Subject.js"
          );
        /* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! ../Subscriber */ "../node_modules/rxjs/dist/esm5/internal/Subscriber.js"
          );
        /* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ../util/lift */ "../node_modules/rxjs/dist/esm5/internal/util/lift.js"
          );

        function share(options) {
          if (options === void 0) {
            options = {};
          }
          var _a = options.connector,
            connector =
              _a === void 0
                ? function () {
                    return new _Subject__WEBPACK_IMPORTED_MODULE_0__.Subject();
                  }
                : _a,
            _b = options.resetOnError,
            resetOnError = _b === void 0 ? true : _b,
            _c = options.resetOnComplete,
            resetOnComplete = _c === void 0 ? true : _c,
            _d = options.resetOnRefCountZero,
            resetOnRefCountZero = _d === void 0 ? true : _d;
          return function (wrapperSource) {
            var connection;
            var resetConnection;
            var subject;
            var refCount = 0;
            var hasCompleted = false;
            var hasErrored = false;
            var cancelReset = function () {
              resetConnection === null || resetConnection === void 0
                ? void 0
                : resetConnection.unsubscribe();
              resetConnection = undefined;
            };
            var reset = function () {
              cancelReset();
              connection = subject = undefined;
              hasCompleted = hasErrored = false;
            };
            var resetAndUnsubscribe = function () {
              var conn = connection;
              reset();
              conn === null || conn === void 0 ? void 0 : conn.unsubscribe();
            };
            return (0, _util_lift__WEBPACK_IMPORTED_MODULE_1__.operate)(
              function (source, subscriber) {
                refCount++;
                if (!hasErrored && !hasCompleted) {
                  cancelReset();
                }
                var dest = (subject =
                  subject !== null && subject !== void 0
                    ? subject
                    : connector());
                subscriber.add(function () {
                  refCount--;
                  if (refCount === 0 && !hasErrored && !hasCompleted) {
                    resetConnection = handleReset(
                      resetAndUnsubscribe,
                      resetOnRefCountZero
                    );
                  }
                });
                dest.subscribe(subscriber);
                if (!connection && refCount > 0) {
                  connection =
                    new _Subscriber__WEBPACK_IMPORTED_MODULE_2__.SafeSubscriber(
                      {
                        next: function (value) {
                          return dest.next(value);
                        },
                        error: function (err) {
                          hasErrored = true;
                          cancelReset();
                          resetConnection = handleReset(
                            reset,
                            resetOnError,
                            err
                          );
                          dest.error(err);
                        },
                        complete: function () {
                          hasCompleted = true;
                          cancelReset();
                          resetConnection = handleReset(reset, resetOnComplete);
                          dest.complete();
                        },
                      }
                    );
                  (0,
                  _observable_innerFrom__WEBPACK_IMPORTED_MODULE_3__.innerFrom)(
                    source
                  ).subscribe(connection);
                }
              }
            )(wrapperSource);
          };
        }
        function handleReset(reset, on) {
          var args = [];
          for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
          }
          if (on === true) {
            reset();
            return;
          }
          if (on === false) {
            return;
          }
          var onSubscriber =
            new _Subscriber__WEBPACK_IMPORTED_MODULE_2__.SafeSubscriber({
              next: function () {
                onSubscriber.unsubscribe();
                reset();
              },
            });
          return on
            .apply(
              void 0,
              (0, tslib__WEBPACK_IMPORTED_MODULE_4__.__spreadArray)(
                [],
                (0, tslib__WEBPACK_IMPORTED_MODULE_4__.__read)(args)
              )
            )
            .subscribe(onSubscriber);
        }
        //# sourceMappingURL=share.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/operators/take.js":
      /*!*****************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/operators/take.js ***!
  \*****************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ take: () => /* binding */ take,
          /* harmony export */
        });
        /* harmony import */ var _observable_empty__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ../observable/empty */ "../node_modules/rxjs/dist/esm5/internal/observable/empty.js"
          );
        /* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ../util/lift */ "../node_modules/rxjs/dist/esm5/internal/util/lift.js"
          );
        /* harmony import */ var _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! ./OperatorSubscriber */ "../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js"
          );

        function take(count) {
          return count <= 0
            ? function () {
                return _observable_empty__WEBPACK_IMPORTED_MODULE_0__.EMPTY;
              }
            : (0, _util_lift__WEBPACK_IMPORTED_MODULE_1__.operate)(function (
                source,
                subscriber
              ) {
                var seen = 0;
                source.subscribe(
                  (0,
                  _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_2__.createOperatorSubscriber)(
                    subscriber,
                    function (value) {
                      if (++seen <= count) {
                        subscriber.next(value);
                        if (count <= seen) {
                          subscriber.complete();
                        }
                      }
                    }
                  )
                );
              });
        }
        //# sourceMappingURL=take.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/operators/takeUntil.js":
      /*!**********************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/operators/takeUntil.js ***!
  \**********************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ takeUntil: () => /* binding */ takeUntil,
          /* harmony export */
        });
        /* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ../util/lift */ "../node_modules/rxjs/dist/esm5/internal/util/lift.js"
          );
        /* harmony import */ var _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! ./OperatorSubscriber */ "../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js"
          );
        /* harmony import */ var _observable_innerFrom__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ../observable/innerFrom */ "../node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js"
          );
        /* harmony import */ var _util_noop__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(
            /*! ../util/noop */ "../node_modules/rxjs/dist/esm5/internal/util/noop.js"
          );

        function takeUntil(notifier) {
          return (0, _util_lift__WEBPACK_IMPORTED_MODULE_0__.operate)(function (
            source,
            subscriber
          ) {
            (0, _observable_innerFrom__WEBPACK_IMPORTED_MODULE_1__.innerFrom)(
              notifier
            ).subscribe(
              (0,
              _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_2__.createOperatorSubscriber)(
                subscriber,
                function () {
                  return subscriber.complete();
                },
                _util_noop__WEBPACK_IMPORTED_MODULE_3__.noop
              )
            );
            !subscriber.closed && source.subscribe(subscriber);
          });
        }
        //# sourceMappingURL=takeUntil.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/operators/tap.js":
      /*!****************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/operators/tap.js ***!
  \****************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ tap: () => /* binding */ tap,
          /* harmony export */
        });
        /* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ../util/isFunction */ "../node_modules/rxjs/dist/esm5/internal/util/isFunction.js"
          );
        /* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ../util/lift */ "../node_modules/rxjs/dist/esm5/internal/util/lift.js"
          );
        /* harmony import */ var _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! ./OperatorSubscriber */ "../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js"
          );
        /* harmony import */ var _util_identity__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(
            /*! ../util/identity */ "../node_modules/rxjs/dist/esm5/internal/util/identity.js"
          );

        function tap(observerOrNext, error, complete) {
          var tapObserver =
            (0, _util_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(
              observerOrNext
            ) ||
            error ||
            complete
              ? { next: observerOrNext, error: error, complete: complete }
              : observerOrNext;
          return tapObserver
            ? (0, _util_lift__WEBPACK_IMPORTED_MODULE_1__.operate)(function (
                source,
                subscriber
              ) {
                var _a;
                (_a = tapObserver.subscribe) === null || _a === void 0
                  ? void 0
                  : _a.call(tapObserver);
                var isUnsub = true;
                source.subscribe(
                  (0,
                  _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_2__.createOperatorSubscriber)(
                    subscriber,
                    function (value) {
                      var _a;
                      (_a = tapObserver.next) === null || _a === void 0
                        ? void 0
                        : _a.call(tapObserver, value);
                      subscriber.next(value);
                    },
                    function () {
                      var _a;
                      isUnsub = false;
                      (_a = tapObserver.complete) === null || _a === void 0
                        ? void 0
                        : _a.call(tapObserver);
                      subscriber.complete();
                    },
                    function (err) {
                      var _a;
                      isUnsub = false;
                      (_a = tapObserver.error) === null || _a === void 0
                        ? void 0
                        : _a.call(tapObserver, err);
                      subscriber.error(err);
                    },
                    function () {
                      var _a, _b;
                      if (isUnsub) {
                        (_a = tapObserver.unsubscribe) === null || _a === void 0
                          ? void 0
                          : _a.call(tapObserver);
                      }
                      (_b = tapObserver.finalize) === null || _b === void 0
                        ? void 0
                        : _b.call(tapObserver);
                    }
                  )
                );
              })
            : _util_identity__WEBPACK_IMPORTED_MODULE_3__.identity;
        }
        //# sourceMappingURL=tap.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/scheduler/timeoutProvider.js":
      /*!****************************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/scheduler/timeoutProvider.js ***!
  \****************************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ timeoutProvider: () =>
            /* binding */ timeoutProvider,
          /* harmony export */
        });
        /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! tslib */ "../node_modules/tslib/tslib.es6.js"
          );

        var timeoutProvider = {
          setTimeout: function (handler, timeout) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
              args[_i - 2] = arguments[_i];
            }
            var delegate = timeoutProvider.delegate;
            if (
              delegate === null || delegate === void 0
                ? void 0
                : delegate.setTimeout
            ) {
              return delegate.setTimeout.apply(
                delegate,
                (0, tslib__WEBPACK_IMPORTED_MODULE_0__.__spreadArray)(
                  [handler, timeout],
                  (0, tslib__WEBPACK_IMPORTED_MODULE_0__.__read)(args)
                )
              );
            }
            return setTimeout.apply(
              void 0,
              (0, tslib__WEBPACK_IMPORTED_MODULE_0__.__spreadArray)(
                [handler, timeout],
                (0, tslib__WEBPACK_IMPORTED_MODULE_0__.__read)(args)
              )
            );
          },
          clearTimeout: function (handle) {
            var delegate = timeoutProvider.delegate;
            return (
              (delegate === null || delegate === void 0
                ? void 0
                : delegate.clearTimeout) || clearTimeout
            )(handle);
          },
          delegate: undefined,
        };
        //# sourceMappingURL=timeoutProvider.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/symbol/iterator.js":
      /*!******************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/symbol/iterator.js ***!
  \******************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ getSymbolIterator: () =>
            /* binding */ getSymbolIterator,
          /* harmony export */ iterator: () => /* binding */ iterator,
          /* harmony export */
        });
        function getSymbolIterator() {
          if (typeof Symbol !== "function" || !Symbol.iterator) {
            return "@@iterator";
          }
          return Symbol.iterator;
        }
        var iterator = getSymbolIterator();
        //# sourceMappingURL=iterator.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/symbol/observable.js":
      /*!********************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/symbol/observable.js ***!
  \********************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ observable: () => /* binding */ observable,
          /* harmony export */
        });
        var observable = (function () {
          return (
            (typeof Symbol === "function" && Symbol.observable) ||
            "@@observable"
          );
        })();
        //# sourceMappingURL=observable.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/util/ObjectUnsubscribedError.js":
      /*!*******************************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/util/ObjectUnsubscribedError.js ***!
  \*******************************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ ObjectUnsubscribedError: () =>
            /* binding */ ObjectUnsubscribedError,
          /* harmony export */
        });
        /* harmony import */ var _createErrorClass__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ./createErrorClass */ "../node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js"
          );

        var ObjectUnsubscribedError = (0,
        _createErrorClass__WEBPACK_IMPORTED_MODULE_0__.createErrorClass)(
          function (_super) {
            return function ObjectUnsubscribedErrorImpl() {
              _super(this);
              this.name = "ObjectUnsubscribedError";
              this.message = "object unsubscribed";
            };
          }
        );
        //# sourceMappingURL=ObjectUnsubscribedError.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/util/UnsubscriptionError.js":
      /*!***************************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/util/UnsubscriptionError.js ***!
  \***************************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ UnsubscriptionError: () =>
            /* binding */ UnsubscriptionError,
          /* harmony export */
        });
        /* harmony import */ var _createErrorClass__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ./createErrorClass */ "../node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js"
          );

        var UnsubscriptionError = (0,
        _createErrorClass__WEBPACK_IMPORTED_MODULE_0__.createErrorClass)(
          function (_super) {
            return function UnsubscriptionErrorImpl(errors) {
              _super(this);
              this.message = errors
                ? errors.length +
                  " errors occurred during unsubscription:\n" +
                  errors
                    .map(function (err, i) {
                      return i + 1 + ") " + err.toString();
                    })
                    .join("\n  ")
                : "";
              this.name = "UnsubscriptionError";
              this.errors = errors;
            };
          }
        );
        //# sourceMappingURL=UnsubscriptionError.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/util/arrRemove.js":
      /*!*****************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/util/arrRemove.js ***!
  \*****************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ arrRemove: () => /* binding */ arrRemove,
          /* harmony export */
        });
        function arrRemove(arr, item) {
          if (arr) {
            var index = arr.indexOf(item);
            0 <= index && arr.splice(index, 1);
          }
        }
        //# sourceMappingURL=arrRemove.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js":
      /*!************************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js ***!
  \************************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ createErrorClass: () =>
            /* binding */ createErrorClass,
          /* harmony export */
        });
        function createErrorClass(createImpl) {
          var _super = function (instance) {
            Error.call(instance);
            instance.stack = new Error().stack;
          };
          var ctorFunc = createImpl(_super);
          ctorFunc.prototype = Object.create(Error.prototype);
          ctorFunc.prototype.constructor = ctorFunc;
          return ctorFunc;
        }
        //# sourceMappingURL=createErrorClass.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/util/errorContext.js":
      /*!********************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/util/errorContext.js ***!
  \********************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ captureError: () => /* binding */ captureError,
          /* harmony export */ errorContext: () => /* binding */ errorContext,
          /* harmony export */
        });
        /* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ../config */ "../node_modules/rxjs/dist/esm5/internal/config.js"
          );

        var context = null;
        function errorContext(cb) {
          if (
            _config__WEBPACK_IMPORTED_MODULE_0__.config
              .useDeprecatedSynchronousErrorHandling
          ) {
            var isRoot = !context;
            if (isRoot) {
              context = { errorThrown: false, error: null };
            }
            cb();
            if (isRoot) {
              var _a = context,
                errorThrown = _a.errorThrown,
                error = _a.error;
              context = null;
              if (errorThrown) {
                throw error;
              }
            }
          } else {
            cb();
          }
        }
        function captureError(err) {
          if (
            _config__WEBPACK_IMPORTED_MODULE_0__.config
              .useDeprecatedSynchronousErrorHandling &&
            context
          ) {
            context.errorThrown = true;
            context.error = err;
          }
        }
        //# sourceMappingURL=errorContext.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/util/executeSchedule.js":
      /*!***********************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/util/executeSchedule.js ***!
  \***********************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ executeSchedule: () =>
            /* binding */ executeSchedule,
          /* harmony export */
        });
        function executeSchedule(
          parentSubscription,
          scheduler,
          work,
          delay,
          repeat
        ) {
          if (delay === void 0) {
            delay = 0;
          }
          if (repeat === void 0) {
            repeat = false;
          }
          var scheduleSubscription = scheduler.schedule(function () {
            work();
            if (repeat) {
              parentSubscription.add(this.schedule(null, delay));
            } else {
              this.unsubscribe();
            }
          }, delay);
          parentSubscription.add(scheduleSubscription);
          if (!repeat) {
            return scheduleSubscription;
          }
        }
        //# sourceMappingURL=executeSchedule.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/util/identity.js":
      /*!****************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/util/identity.js ***!
  \****************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ identity: () => /* binding */ identity,
          /* harmony export */
        });
        function identity(x) {
          return x;
        }
        //# sourceMappingURL=identity.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/util/isArrayLike.js":
      /*!*******************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/util/isArrayLike.js ***!
  \*******************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ isArrayLike: () => /* binding */ isArrayLike,
          /* harmony export */
        });
        var isArrayLike = function (x) {
          return x && typeof x.length === "number" && typeof x !== "function";
        };
        //# sourceMappingURL=isArrayLike.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/util/isAsyncIterable.js":
      /*!***********************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/util/isAsyncIterable.js ***!
  \***********************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ isAsyncIterable: () =>
            /* binding */ isAsyncIterable,
          /* harmony export */
        });
        /* harmony import */ var _isFunction__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ./isFunction */ "../node_modules/rxjs/dist/esm5/internal/util/isFunction.js"
          );

        function isAsyncIterable(obj) {
          return (
            Symbol.asyncIterator &&
            (0, _isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(
              obj === null || obj === void 0
                ? void 0
                : obj[Symbol.asyncIterator]
            )
          );
        }
        //# sourceMappingURL=isAsyncIterable.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/util/isFunction.js":
      /*!******************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/util/isFunction.js ***!
  \******************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ isFunction: () => /* binding */ isFunction,
          /* harmony export */
        });
        function isFunction(value) {
          return typeof value === "function";
        }
        //# sourceMappingURL=isFunction.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/util/isInteropObservable.js":
      /*!***************************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/util/isInteropObservable.js ***!
  \***************************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ isInteropObservable: () =>
            /* binding */ isInteropObservable,
          /* harmony export */
        });
        /* harmony import */ var _symbol_observable__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ../symbol/observable */ "../node_modules/rxjs/dist/esm5/internal/symbol/observable.js"
          );
        /* harmony import */ var _isFunction__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ./isFunction */ "../node_modules/rxjs/dist/esm5/internal/util/isFunction.js"
          );

        function isInteropObservable(input) {
          return (0, _isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(
            input[_symbol_observable__WEBPACK_IMPORTED_MODULE_1__.observable]
          );
        }
        //# sourceMappingURL=isInteropObservable.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/util/isIterable.js":
      /*!******************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/util/isIterable.js ***!
  \******************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ isIterable: () => /* binding */ isIterable,
          /* harmony export */
        });
        /* harmony import */ var _symbol_iterator__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ../symbol/iterator */ "../node_modules/rxjs/dist/esm5/internal/symbol/iterator.js"
          );
        /* harmony import */ var _isFunction__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ./isFunction */ "../node_modules/rxjs/dist/esm5/internal/util/isFunction.js"
          );

        function isIterable(input) {
          return (0, _isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(
            input === null || input === void 0
              ? void 0
              : input[_symbol_iterator__WEBPACK_IMPORTED_MODULE_1__.iterator]
          );
        }
        //# sourceMappingURL=isIterable.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/util/isPromise.js":
      /*!*****************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/util/isPromise.js ***!
  \*****************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ isPromise: () => /* binding */ isPromise,
          /* harmony export */
        });
        /* harmony import */ var _isFunction__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ./isFunction */ "../node_modules/rxjs/dist/esm5/internal/util/isFunction.js"
          );

        function isPromise(value) {
          return (0, _isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(
            value === null || value === void 0 ? void 0 : value.then
          );
        }
        //# sourceMappingURL=isPromise.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/util/isReadableStreamLike.js":
      /*!****************************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/util/isReadableStreamLike.js ***!
  \****************************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ isReadableStreamLike: () =>
            /* binding */ isReadableStreamLike,
          /* harmony export */ readableStreamLikeToAsyncGenerator: () =>
            /* binding */ readableStreamLikeToAsyncGenerator,
          /* harmony export */
        });
        /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! tslib */ "../node_modules/tslib/tslib.es6.js"
          );
        /* harmony import */ var _isFunction__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ./isFunction */ "../node_modules/rxjs/dist/esm5/internal/util/isFunction.js"
          );

        function readableStreamLikeToAsyncGenerator(readableStream) {
          return (0, tslib__WEBPACK_IMPORTED_MODULE_0__.__asyncGenerator)(
            this,
            arguments,
            function readableStreamLikeToAsyncGenerator_1() {
              var reader, _a, value, done;
              return (0, tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(
                this,
                function (_b) {
                  switch (_b.label) {
                    case 0:
                      reader = readableStream.getReader();
                      _b.label = 1;
                    case 1:
                      _b.trys.push([1, , 9, 10]);
                      _b.label = 2;
                    case 2:
                      if (false) {
                      }
                      return [
                        4,
                        (0, tslib__WEBPACK_IMPORTED_MODULE_0__.__await)(
                          reader.read()
                        ),
                      ];
                    case 3:
                      (_a = _b.sent()), (value = _a.value), (done = _a.done);
                      if (!done) return [3, 5];
                      return [
                        4,
                        (0, tslib__WEBPACK_IMPORTED_MODULE_0__.__await)(void 0),
                      ];
                    case 4:
                      return [2, _b.sent()];
                    case 5:
                      return [
                        4,
                        (0, tslib__WEBPACK_IMPORTED_MODULE_0__.__await)(value),
                      ];
                    case 6:
                      return [4, _b.sent()];
                    case 7:
                      _b.sent();
                      return [3, 2];
                    case 8:
                      return [3, 10];
                    case 9:
                      reader.releaseLock();
                      return [7];
                    case 10:
                      return [2];
                  }
                }
              );
            }
          );
        }
        function isReadableStreamLike(obj) {
          return (0, _isFunction__WEBPACK_IMPORTED_MODULE_1__.isFunction)(
            obj === null || obj === void 0 ? void 0 : obj.getReader
          );
        }
        //# sourceMappingURL=isReadableStreamLike.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/util/lift.js":
      /*!************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/util/lift.js ***!
  \************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ hasLift: () => /* binding */ hasLift,
          /* harmony export */ operate: () => /* binding */ operate,
          /* harmony export */
        });
        /* harmony import */ var _isFunction__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ./isFunction */ "../node_modules/rxjs/dist/esm5/internal/util/isFunction.js"
          );

        function hasLift(source) {
          return (0, _isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(
            source === null || source === void 0 ? void 0 : source.lift
          );
        }
        function operate(init) {
          return function (source) {
            if (hasLift(source)) {
              return source.lift(function (liftedSource) {
                try {
                  return init(liftedSource, this);
                } catch (err) {
                  this.error(err);
                }
              });
            }
            throw new TypeError("Unable to lift unknown Observable type");
          };
        }
        //# sourceMappingURL=lift.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/util/mapOneOrManyArgs.js":
      /*!************************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/util/mapOneOrManyArgs.js ***!
  \************************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ mapOneOrManyArgs: () =>
            /* binding */ mapOneOrManyArgs,
          /* harmony export */
        });
        /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! tslib */ "../node_modules/tslib/tslib.es6.js"
          );
        /* harmony import */ var _operators_map__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ../operators/map */ "../node_modules/rxjs/dist/esm5/internal/operators/map.js"
          );

        var isArray = Array.isArray;
        function callOrApply(fn, args) {
          return isArray(args)
            ? fn.apply(
                void 0,
                (0, tslib__WEBPACK_IMPORTED_MODULE_0__.__spreadArray)(
                  [],
                  (0, tslib__WEBPACK_IMPORTED_MODULE_0__.__read)(args)
                )
              )
            : fn(args);
        }
        function mapOneOrManyArgs(fn) {
          return (0, _operators_map__WEBPACK_IMPORTED_MODULE_1__.map)(function (
            args
          ) {
            return callOrApply(fn, args);
          });
        }
        //# sourceMappingURL=mapOneOrManyArgs.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/util/noop.js":
      /*!************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/util/noop.js ***!
  \************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ noop: () => /* binding */ noop,
          /* harmony export */
        });
        function noop() {}
        //# sourceMappingURL=noop.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/util/pipe.js":
      /*!************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/util/pipe.js ***!
  \************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ pipe: () => /* binding */ pipe,
          /* harmony export */ pipeFromArray: () => /* binding */ pipeFromArray,
          /* harmony export */
        });
        /* harmony import */ var _identity__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ./identity */ "../node_modules/rxjs/dist/esm5/internal/util/identity.js"
          );

        function pipe() {
          var fns = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            fns[_i] = arguments[_i];
          }
          return pipeFromArray(fns);
        }
        function pipeFromArray(fns) {
          if (fns.length === 0) {
            return _identity__WEBPACK_IMPORTED_MODULE_0__.identity;
          }
          if (fns.length === 1) {
            return fns[0];
          }
          return function piped(input) {
            return fns.reduce(function (prev, fn) {
              return fn(prev);
            }, input);
          };
        }
        //# sourceMappingURL=pipe.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/util/reportUnhandledError.js":
      /*!****************************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/util/reportUnhandledError.js ***!
  \****************************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ reportUnhandledError: () =>
            /* binding */ reportUnhandledError,
          /* harmony export */
        });
        /* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ../config */ "../node_modules/rxjs/dist/esm5/internal/config.js"
          );
        /* harmony import */ var _scheduler_timeoutProvider__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ../scheduler/timeoutProvider */ "../node_modules/rxjs/dist/esm5/internal/scheduler/timeoutProvider.js"
          );

        function reportUnhandledError(err) {
          _scheduler_timeoutProvider__WEBPACK_IMPORTED_MODULE_0__.timeoutProvider.setTimeout(
            function () {
              var onUnhandledError =
                _config__WEBPACK_IMPORTED_MODULE_1__.config.onUnhandledError;
              if (onUnhandledError) {
                onUnhandledError(err);
              } else {
                throw err;
              }
            }
          );
        }
        //# sourceMappingURL=reportUnhandledError.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/util/throwUnobservableError.js":
      /*!******************************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/util/throwUnobservableError.js ***!
  \******************************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ createInvalidObservableTypeError: () =>
            /* binding */ createInvalidObservableTypeError,
          /* harmony export */
        });
        function createInvalidObservableTypeError(input) {
          return new TypeError(
            "You provided " +
              (input !== null && typeof input === "object"
                ? "an invalid object"
                : "'" + input + "'") +
              " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable."
          );
        }
        //# sourceMappingURL=throwUnobservableError.js.map

        /***/
      },

    /***/ "./content-script/interface-inject.ts":
      /*!********************************************!*\
  !*** ./content-script/interface-inject.ts ***!
  \********************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ injectDappInterface: () =>
            /* binding */ injectDappInterface,
          /* harmony export */
        });
        /* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! webextension-polyfill */ "../node_modules/webextension-polyfill/dist/browser-polyfill.js"
          );
        /* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default =
          /*#__PURE__*/ __webpack_require__.n(
            webextension_polyfill__WEBPACK_IMPORTED_MODULE_0__
          );
        // Copyright (c) 2022, Mysten Labs, Inc.
        // SPDX-License-Identifier: Apache-2.0

        function injectDappInterface() {
          const script = document.createElement("script");
          script.setAttribute(
            "src",
            webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().runtime.getURL(
              "dapp-interface.js"
            )
          );
          const container = document.head || document.documentElement;
          container.insertBefore(script, container.firstElementChild);
          container.removeChild(script);
        }

        /***/
      },

    /***/ "./content-script/messages-proxy.ts":
      /*!******************************************!*\
  !*** ./content-script/messages-proxy.ts ***!
  \******************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ setupMessagesProxy: () =>
            /* binding */ setupMessagesProxy,
          /* harmony export */
        });
        /* harmony import */ var _messaging_PortStream__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! _messaging/PortStream */ "./shared/messaging/PortStream.ts"
          );
        /* harmony import */ var _messaging_WindowMessageStream__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! _messaging/WindowMessageStream */ "./shared/messaging/WindowMessageStream.ts"
          );
        // Copyright (c) 2022, Mysten Labs, Inc.
        // SPDX-License-Identifier: Apache-2.0

        function createPort(windowMsgStream) {
          const port =
            _messaging_PortStream__WEBPACK_IMPORTED_MODULE_0__.PortStream.connectToBackgroundService(
              "ethos_content<->background"
            );
          port.onMessage.subscribe((msg) => {
            windowMsgStream.send(msg);
          });
          const windowMsgSub = windowMsgStream.messages.subscribe((msg) => {
            port.sendMessage(msg);
          });
          port.onDisconnect.subscribe((port) => {
            windowMsgSub.unsubscribe();
            createPort(windowMsgStream);
          });
        }
        function setupMessagesProxy() {
          const windowMsgStream =
            new _messaging_WindowMessageStream__WEBPACK_IMPORTED_MODULE_1__.WindowMessageStream(
              "ethos_content-script",
              "ethos_in-page"
            );
          createPort(windowMsgStream);
        }

        /***/
      },

    /***/ "./shared/messaging/PortStream.ts":
      /*!****************************************!*\
  !*** ./shared/messaging/PortStream.ts ***!
  \****************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ PortStream: () => /* binding */ PortStream,
          /* harmony export */
        });
        /* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! rxjs */ "../node_modules/rxjs/dist/esm5/internal/observable/fromEventPattern.js"
          );
        /* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! rxjs */ "../node_modules/rxjs/dist/esm5/internal/operators/take.js"
          );
        /* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(
            /*! rxjs */ "../node_modules/rxjs/dist/esm5/internal/operators/tap.js"
          );
        /* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(
            /*! rxjs */ "../node_modules/rxjs/dist/esm5/internal/operators/share.js"
          );
        /* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(
            /*! rxjs */ "../node_modules/rxjs/dist/esm5/internal/operators/takeUntil.js"
          );
        /* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ =
          __webpack_require__(
            /*! rxjs */ "../node_modules/rxjs/dist/esm5/internal/operators/filter.js"
          );
        /* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! webextension-polyfill */ "../node_modules/webextension-polyfill/dist/browser-polyfill.js"
          );
        /* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default =
          /*#__PURE__*/ __webpack_require__.n(
            webextension_polyfill__WEBPACK_IMPORTED_MODULE_0__
          );
        // Copyright (c) 2022, Mysten Labs, Inc.
        // SPDX-License-Identifier: Apache-2.0

        class PortStream {
          constructor(port) {
            this._port = port;
            this._disconnectStream = (0,
            rxjs__WEBPACK_IMPORTED_MODULE_1__.fromEventPattern)(
              (h) => this._port.onDisconnect.addListener(h),
              (h) => this._port.onDisconnect.removeListener(h)
            ).pipe(
              (0, rxjs__WEBPACK_IMPORTED_MODULE_2__.take)(1),
              (0, rxjs__WEBPACK_IMPORTED_MODULE_3__.tap)(
                () => (this._connected = false)
              ),
              (0, rxjs__WEBPACK_IMPORTED_MODULE_4__.share)()
            );
            this._messagesStream = (0,
            rxjs__WEBPACK_IMPORTED_MODULE_1__.fromEventPattern)(
              (h) => this._port.onMessage.addListener(h),
              (h) => this._port.onMessage.removeListener(h),
              (msg) => msg
            ).pipe(
              (0, rxjs__WEBPACK_IMPORTED_MODULE_4__.share)(),
              (0, rxjs__WEBPACK_IMPORTED_MODULE_5__.takeUntil)(
                this._disconnectStream
              )
            );
            this._connected = true;
          }
          static connectToBackgroundService(name) {
            return new PortStream(
              webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().runtime.connect(
                { name }
              )
            );
          }
          get onMessage() {
            return this._messagesStream;
          }
          get onDisconnect() {
            return this._disconnectStream;
          }
          get connected() {
            return this._connected;
          }
          sendMessage(msg) {
            if (!this._port) {
              throw new Error(
                "Port to background service worker is not defined"
              );
            }
            this._port.postMessage(msg);
            return this.createResponseObservable(msg.id);
          }
          createResponseObservable(requestMsgID) {
            return this._messagesStream.pipe(
              (0, rxjs__WEBPACK_IMPORTED_MODULE_6__.filter)(
                (msg) => msg.id === requestMsgID
              )
            );
          }
        }

        /***/
      },

    /***/ "./shared/messaging/WindowMessageStream.ts":
      /*!*************************************************!*\
  !*** ./shared/messaging/WindowMessageStream.ts ***!
  \*************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ WindowMessageStream: () =>
            /* binding */ WindowMessageStream,
          /* harmony export */
        });
        /* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! rxjs */ "../node_modules/rxjs/dist/esm5/internal/observable/fromEvent.js"
          );
        /* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! rxjs */ "../node_modules/rxjs/dist/esm5/internal/operators/filter.js"
          );
        /* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! rxjs */ "../node_modules/rxjs/dist/esm5/internal/operators/map.js"
          );
        // Copyright (c) 2022, Mysten Labs, Inc.
        // SPDX-License-Identifier: Apache-2.0

        class WindowMessageStream {
          constructor(name, target) {
            if (name === target) {
              throw new Error(
                "[WindowMessageStream] name and target must be different"
              );
            }
            this._name = name;
            this._target = target;
            this.messages = (0, rxjs__WEBPACK_IMPORTED_MODULE_0__.fromEvent)(
              window,
              "message"
            ).pipe(
              (0, rxjs__WEBPACK_IMPORTED_MODULE_1__.filter)(
                (message) =>
                  message.source === window &&
                  message.data.target === this._name
              ),
              (0, rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(
                (message) => message.data.payload
              )
            );
          }
          send(payload) {
            const msg = {
              target: this._target,
              payload,
            };
            window.postMessage(msg);
          }
        }

        /***/
      },

    /***/ "../node_modules/tslib/tslib.es6.js":
      /*!******************************************!*\
  !*** ../node_modules/tslib/tslib.es6.js ***!
  \******************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ __assign: () => /* binding */ __assign,
          /* harmony export */ __asyncDelegator: () =>
            /* binding */ __asyncDelegator,
          /* harmony export */ __asyncGenerator: () =>
            /* binding */ __asyncGenerator,
          /* harmony export */ __asyncValues: () => /* binding */ __asyncValues,
          /* harmony export */ __await: () => /* binding */ __await,
          /* harmony export */ __awaiter: () => /* binding */ __awaiter,
          /* harmony export */ __classPrivateFieldGet: () =>
            /* binding */ __classPrivateFieldGet,
          /* harmony export */ __classPrivateFieldIn: () =>
            /* binding */ __classPrivateFieldIn,
          /* harmony export */ __classPrivateFieldSet: () =>
            /* binding */ __classPrivateFieldSet,
          /* harmony export */ __createBinding: () =>
            /* binding */ __createBinding,
          /* harmony export */ __decorate: () => /* binding */ __decorate,
          /* harmony export */ __exportStar: () => /* binding */ __exportStar,
          /* harmony export */ __extends: () => /* binding */ __extends,
          /* harmony export */ __generator: () => /* binding */ __generator,
          /* harmony export */ __importDefault: () =>
            /* binding */ __importDefault,
          /* harmony export */ __importStar: () => /* binding */ __importStar,
          /* harmony export */ __makeTemplateObject: () =>
            /* binding */ __makeTemplateObject,
          /* harmony export */ __metadata: () => /* binding */ __metadata,
          /* harmony export */ __param: () => /* binding */ __param,
          /* harmony export */ __read: () => /* binding */ __read,
          /* harmony export */ __rest: () => /* binding */ __rest,
          /* harmony export */ __spread: () => /* binding */ __spread,
          /* harmony export */ __spreadArray: () => /* binding */ __spreadArray,
          /* harmony export */ __spreadArrays: () =>
            /* binding */ __spreadArrays,
          /* harmony export */ __values: () => /* binding */ __values,
          /* harmony export */
        });
        /******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
        /* global Reflect, Promise */

        var extendStatics = function (d, b) {
          extendStatics =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (d, b) {
                d.__proto__ = b;
              }) ||
            function (d, b) {
              for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
            };
          return extendStatics(d, b);
        };

        function __extends(d, b) {
          if (typeof b !== "function" && b !== null)
            throw new TypeError(
              "Class extends value " +
                String(b) +
                " is not a constructor or null"
            );
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype =
            b === null
              ? Object.create(b)
              : ((__.prototype = b.prototype), new __());
        }

        var __assign = function () {
          __assign =
            Object.assign ||
            function __assign(t) {
              for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                  if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
              }
              return t;
            };
          return __assign.apply(this, arguments);
        };

        function __rest(s, e) {
          var t = {};
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
              t[p] = s[p];
          if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (
              var i = 0, p = Object.getOwnPropertySymbols(s);
              i < p.length;
              i++
            ) {
              if (
                e.indexOf(p[i]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(s, p[i])
              )
                t[p[i]] = s[p[i]];
            }
          return t;
        }

        function __decorate(decorators, target, key, desc) {
          var c = arguments.length,
            r =
              c < 3
                ? target
                : desc === null
                ? (desc = Object.getOwnPropertyDescriptor(target, key))
                : desc,
            d;
          if (
            typeof Reflect === "object" &&
            typeof Reflect.decorate === "function"
          )
            r = Reflect.decorate(decorators, target, key, desc);
          else
            for (var i = decorators.length - 1; i >= 0; i--)
              if ((d = decorators[i]))
                r =
                  (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) ||
                  r;
          return c > 3 && r && Object.defineProperty(target, key, r), r;
        }

        function __param(paramIndex, decorator) {
          return function (target, key) {
            decorator(target, key, paramIndex);
          };
        }

        function __metadata(metadataKey, metadataValue) {
          if (
            typeof Reflect === "object" &&
            typeof Reflect.metadata === "function"
          )
            return Reflect.metadata(metadataKey, metadataValue);
        }

        function __awaiter(thisArg, _arguments, P, generator) {
          function adopt(value) {
            return value instanceof P
              ? value
              : new P(function (resolve) {
                  resolve(value);
                });
          }
          return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
              try {
                step(generator.next(value));
              } catch (e) {
                reject(e);
              }
            }
            function rejected(value) {
              try {
                step(generator["throw"](value));
              } catch (e) {
                reject(e);
              }
            }
            function step(result) {
              result.done
                ? resolve(result.value)
                : adopt(result.value).then(fulfilled, rejected);
            }
            step(
              (generator = generator.apply(thisArg, _arguments || [])).next()
            );
          });
        }

        function __generator(thisArg, body) {
          var _ = {
              label: 0,
              sent: function () {
                if (t[0] & 1) throw t[1];
                return t[1];
              },
              trys: [],
              ops: [],
            },
            f,
            y,
            t,
            g;
          return (
            (g = { next: verb(0), throw: verb(1), return: verb(2) }),
            typeof Symbol === "function" &&
              (g[Symbol.iterator] = function () {
                return this;
              }),
            g
          );
          function verb(n) {
            return function (v) {
              return step([n, v]);
            };
          }
          function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_)
              try {
                if (
                  ((f = 1),
                  y &&
                    (t =
                      op[0] & 2
                        ? y["return"]
                        : op[0]
                        ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                        : y.next) &&
                    !(t = t.call(y, op[1])).done)
                )
                  return t;
                if (((y = 0), t)) op = [op[0] & 2, t.value];
                switch (op[0]) {
                  case 0:
                  case 1:
                    t = op;
                    break;
                  case 4:
                    _.label++;
                    return { value: op[1], done: false };
                  case 5:
                    _.label++;
                    y = op[1];
                    op = [0];
                    continue;
                  case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                  default:
                    if (
                      !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                      (op[0] === 6 || op[0] === 2)
                    ) {
                      _ = 0;
                      continue;
                    }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                      _.label = op[1];
                      break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                      _.label = t[1];
                      t = op;
                      break;
                    }
                    if (t && _.label < t[2]) {
                      _.label = t[2];
                      _.ops.push(op);
                      break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
                }
                op = body.call(thisArg, _);
              } catch (e) {
                op = [6, e];
                y = 0;
              } finally {
                f = t = 0;
              }
            if (op[0] & 5) throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
          }
        }

        var __createBinding = Object.create
          ? function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              var desc = Object.getOwnPropertyDescriptor(m, k);
              if (
                !desc ||
                ("get" in desc
                  ? !m.__esModule
                  : desc.writable || desc.configurable)
              ) {
                desc = {
                  enumerable: true,
                  get: function () {
                    return m[k];
                  },
                };
              }
              Object.defineProperty(o, k2, desc);
            }
          : function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              o[k2] = m[k];
            };

        function __exportStar(m, o) {
          for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
              __createBinding(o, m, p);
        }

        function __values(o) {
          var s = typeof Symbol === "function" && Symbol.iterator,
            m = s && o[s],
            i = 0;
          if (m) return m.call(o);
          if (o && typeof o.length === "number")
            return {
              next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
              },
            };
          throw new TypeError(
            s ? "Object is not iterable." : "Symbol.iterator is not defined."
          );
        }

        function __read(o, n) {
          var m = typeof Symbol === "function" && o[Symbol.iterator];
          if (!m) return o;
          var i = m.call(o),
            r,
            ar = [],
            e;
          try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
              ar.push(r.value);
          } catch (error) {
            e = { error: error };
          } finally {
            try {
              if (r && !r.done && (m = i["return"])) m.call(i);
            } finally {
              if (e) throw e.error;
            }
          }
          return ar;
        }

        /** @deprecated */
        function __spread() {
          for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
          return ar;
        }

        /** @deprecated */
        function __spreadArrays() {
          for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
          for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
              r[k] = a[j];
          return r;
        }

        function __spreadArray(to, from, pack) {
          if (pack || arguments.length === 2)
            for (var i = 0, l = from.length, ar; i < l; i++) {
              if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
              }
            }
          return to.concat(ar || Array.prototype.slice.call(from));
        }

        function __await(v) {
          return this instanceof __await
            ? ((this.v = v), this)
            : new __await(v);
        }

        function __asyncGenerator(thisArg, _arguments, generator) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var g = generator.apply(thisArg, _arguments || []),
            i,
            q = [];
          return (
            (i = {}),
            verb("next"),
            verb("throw"),
            verb("return"),
            (i[Symbol.asyncIterator] = function () {
              return this;
            }),
            i
          );
          function verb(n) {
            if (g[n])
              i[n] = function (v) {
                return new Promise(function (a, b) {
                  q.push([n, v, a, b]) > 1 || resume(n, v);
                });
              };
          }
          function resume(n, v) {
            try {
              step(g[n](v));
            } catch (e) {
              settle(q[0][3], e);
            }
          }
          function step(r) {
            r.value instanceof __await
              ? Promise.resolve(r.value.v).then(fulfill, reject)
              : settle(q[0][2], r);
          }
          function fulfill(value) {
            resume("next", value);
          }
          function reject(value) {
            resume("throw", value);
          }
          function settle(f, v) {
            if ((f(v), q.shift(), q.length)) resume(q[0][0], q[0][1]);
          }
        }

        function __asyncDelegator(o) {
          var i, p;
          return (
            (i = {}),
            verb("next"),
            verb("throw", function (e) {
              throw e;
            }),
            verb("return"),
            (i[Symbol.iterator] = function () {
              return this;
            }),
            i
          );
          function verb(n, f) {
            i[n] = o[n]
              ? function (v) {
                  return (p = !p)
                    ? { value: __await(o[n](v)), done: n === "return" }
                    : f
                    ? f(v)
                    : v;
                }
              : f;
          }
        }

        function __asyncValues(o) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var m = o[Symbol.asyncIterator],
            i;
          return m
            ? m.call(o)
            : ((o =
                typeof __values === "function"
                  ? __values(o)
                  : o[Symbol.iterator]()),
              (i = {}),
              verb("next"),
              verb("throw"),
              verb("return"),
              (i[Symbol.asyncIterator] = function () {
                return this;
              }),
              i);
          function verb(n) {
            i[n] =
              o[n] &&
              function (v) {
                return new Promise(function (resolve, reject) {
                  (v = o[n](v)), settle(resolve, reject, v.done, v.value);
                });
              };
          }
          function settle(resolve, reject, d, v) {
            Promise.resolve(v).then(function (v) {
              resolve({ value: v, done: d });
            }, reject);
          }
        }

        function __makeTemplateObject(cooked, raw) {
          if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
          } else {
            cooked.raw = raw;
          }
          return cooked;
        }

        var __setModuleDefault = Object.create
          ? function (o, v) {
              Object.defineProperty(o, "default", {
                enumerable: true,
                value: v,
              });
            }
          : function (o, v) {
              o["default"] = v;
            };

        function __importStar(mod) {
          if (mod && mod.__esModule) return mod;
          var result = {};
          if (mod != null)
            for (var k in mod)
              if (
                k !== "default" &&
                Object.prototype.hasOwnProperty.call(mod, k)
              )
                __createBinding(result, mod, k);
          __setModuleDefault(result, mod);
          return result;
        }

        function __importDefault(mod) {
          return mod && mod.__esModule ? mod : { default: mod };
        }

        function __classPrivateFieldGet(receiver, state, kind, f) {
          if (kind === "a" && !f)
            throw new TypeError(
              "Private accessor was defined without a getter"
            );
          if (
            typeof state === "function"
              ? receiver !== state || !f
              : !state.has(receiver)
          )
            throw new TypeError(
              "Cannot read private member from an object whose class did not declare it"
            );
          return kind === "m"
            ? f
            : kind === "a"
            ? f.call(receiver)
            : f
            ? f.value
            : state.get(receiver);
        }

        function __classPrivateFieldSet(receiver, state, value, kind, f) {
          if (kind === "m")
            throw new TypeError("Private method is not writable");
          if (kind === "a" && !f)
            throw new TypeError(
              "Private accessor was defined without a setter"
            );
          if (
            typeof state === "function"
              ? receiver !== state || !f
              : !state.has(receiver)
          )
            throw new TypeError(
              "Cannot write private member to an object whose class did not declare it"
            );
          return (
            kind === "a"
              ? f.call(receiver, value)
              : f
              ? (f.value = value)
              : state.set(receiver, value),
            value
          );
        }

        function __classPrivateFieldIn(state, receiver) {
          if (
            receiver === null ||
            (typeof receiver !== "object" && typeof receiver !== "function")
          )
            throw new TypeError("Cannot use 'in' operator on non-object");
          return typeof state === "function"
            ? receiver === state
            : state.has(receiver);
        }

        /***/
      },

    /***/ "../node_modules/webextension-polyfill/dist/browser-polyfill.js":
      /*!**********************************************************************!*\
  !*** ../node_modules/webextension-polyfill/dist/browser-polyfill.js ***!
  \**********************************************************************/
      /***/ function (module, exports) {
        var __WEBPACK_AMD_DEFINE_FACTORY__,
          __WEBPACK_AMD_DEFINE_ARRAY__,
          __WEBPACK_AMD_DEFINE_RESULT__;
        (function (global, factory) {
          if (true) {
            !((__WEBPACK_AMD_DEFINE_ARRAY__ = [module]),
            (__WEBPACK_AMD_DEFINE_FACTORY__ = factory),
            (__WEBPACK_AMD_DEFINE_RESULT__ =
              typeof __WEBPACK_AMD_DEFINE_FACTORY__ === "function"
                ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(
                    exports,
                    __WEBPACK_AMD_DEFINE_ARRAY__
                  )
                : __WEBPACK_AMD_DEFINE_FACTORY__),
            __WEBPACK_AMD_DEFINE_RESULT__ !== undefined &&
              (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
          } else {
            var mod;
          }
        })(
          typeof globalThis !== "undefined"
            ? globalThis
            : typeof self !== "undefined"
            ? self
            : this,
          function (module) {
            /* webextension-polyfill - v0.9.0 - Fri Mar 25 2022 17:00:23 */

            /* -*- Mode: indent-tabs-mode: nil; js-indent-level: 2 -*- */

            /* vim: set sts=2 sw=2 et tw=80: */

            /* This Source Code Form is subject to the terms of the Mozilla Public
             * License, v. 2.0. If a copy of the MPL was not distributed with this
             * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
            "use strict";

            if (
              typeof globalThis != "object" ||
              typeof chrome != "object" ||
              !chrome ||
              !chrome.runtime ||
              !chrome.runtime.id
            ) {
              throw new Error(
                "This script should only be loaded in a browser extension."
              );
            }

            if (
              typeof globalThis.browser === "undefined" ||
              Object.getPrototypeOf(globalThis.browser) !== Object.prototype
            ) {
              const CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE =
                "The message port closed before a response was received.";
              const SEND_RESPONSE_DEPRECATION_WARNING =
                "Returning a Promise is the preferred way to send a reply from an onMessage/onMessageExternal listener, as the sendResponse will be removed from the specs (See https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage)"; // Wrapping the bulk of this polyfill in a one-time-use function is a minor
              // optimization for Firefox. Since Spidermonkey does not fully parse the
              // contents of a function until the first time it's called, and since it will
              // never actually need to be called, this allows the polyfill to be included
              // in Firefox nearly for free.

              const wrapAPIs = (extensionAPIs) => {
                // NOTE: apiMetadata is associated to the content of the api-metadata.json file
                // at build time by replacing the following "include" with the content of the
                // JSON file.
                const apiMetadata = {
                  alarms: {
                    clear: {
                      minArgs: 0,
                      maxArgs: 1,
                    },
                    clearAll: {
                      minArgs: 0,
                      maxArgs: 0,
                    },
                    get: {
                      minArgs: 0,
                      maxArgs: 1,
                    },
                    getAll: {
                      minArgs: 0,
                      maxArgs: 0,
                    },
                  },
                  bookmarks: {
                    create: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    get: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    getChildren: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    getRecent: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    getSubTree: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    getTree: {
                      minArgs: 0,
                      maxArgs: 0,
                    },
                    move: {
                      minArgs: 2,
                      maxArgs: 2,
                    },
                    remove: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    removeTree: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    search: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    update: {
                      minArgs: 2,
                      maxArgs: 2,
                    },
                  },
                  browserAction: {
                    disable: {
                      minArgs: 0,
                      maxArgs: 1,
                      fallbackToNoCallback: true,
                    },
                    enable: {
                      minArgs: 0,
                      maxArgs: 1,
                      fallbackToNoCallback: true,
                    },
                    getBadgeBackgroundColor: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    getBadgeText: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    getPopup: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    getTitle: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    openPopup: {
                      minArgs: 0,
                      maxArgs: 0,
                    },
                    setBadgeBackgroundColor: {
                      minArgs: 1,
                      maxArgs: 1,
                      fallbackToNoCallback: true,
                    },
                    setBadgeText: {
                      minArgs: 1,
                      maxArgs: 1,
                      fallbackToNoCallback: true,
                    },
                    setIcon: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    setPopup: {
                      minArgs: 1,
                      maxArgs: 1,
                      fallbackToNoCallback: true,
                    },
                    setTitle: {
                      minArgs: 1,
                      maxArgs: 1,
                      fallbackToNoCallback: true,
                    },
                  },
                  browsingData: {
                    remove: {
                      minArgs: 2,
                      maxArgs: 2,
                    },
                    removeCache: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    removeCookies: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    removeDownloads: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    removeFormData: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    removeHistory: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    removeLocalStorage: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    removePasswords: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    removePluginData: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    settings: {
                      minArgs: 0,
                      maxArgs: 0,
                    },
                  },
                  commands: {
                    getAll: {
                      minArgs: 0,
                      maxArgs: 0,
                    },
                  },
                  contextMenus: {
                    remove: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    removeAll: {
                      minArgs: 0,
                      maxArgs: 0,
                    },
                    update: {
                      minArgs: 2,
                      maxArgs: 2,
                    },
                  },
                  cookies: {
                    get: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    getAll: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    getAllCookieStores: {
                      minArgs: 0,
                      maxArgs: 0,
                    },
                    remove: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    set: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                  },
                  devtools: {
                    inspectedWindow: {
                      eval: {
                        minArgs: 1,
                        maxArgs: 2,
                        singleCallbackArg: false,
                      },
                    },
                    panels: {
                      create: {
                        minArgs: 3,
                        maxArgs: 3,
                        singleCallbackArg: true,
                      },
                      elements: {
                        createSidebarPane: {
                          minArgs: 1,
                          maxArgs: 1,
                        },
                      },
                    },
                  },
                  downloads: {
                    cancel: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    download: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    erase: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    getFileIcon: {
                      minArgs: 1,
                      maxArgs: 2,
                    },
                    open: {
                      minArgs: 1,
                      maxArgs: 1,
                      fallbackToNoCallback: true,
                    },
                    pause: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    removeFile: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    resume: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    search: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    show: {
                      minArgs: 1,
                      maxArgs: 1,
                      fallbackToNoCallback: true,
                    },
                  },
                  extension: {
                    isAllowedFileSchemeAccess: {
                      minArgs: 0,
                      maxArgs: 0,
                    },
                    isAllowedIncognitoAccess: {
                      minArgs: 0,
                      maxArgs: 0,
                    },
                  },
                  history: {
                    addUrl: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    deleteAll: {
                      minArgs: 0,
                      maxArgs: 0,
                    },
                    deleteRange: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    deleteUrl: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    getVisits: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    search: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                  },
                  i18n: {
                    detectLanguage: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    getAcceptLanguages: {
                      minArgs: 0,
                      maxArgs: 0,
                    },
                  },
                  identity: {
                    launchWebAuthFlow: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                  },
                  idle: {
                    queryState: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                  },
                  management: {
                    get: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    getAll: {
                      minArgs: 0,
                      maxArgs: 0,
                    },
                    getSelf: {
                      minArgs: 0,
                      maxArgs: 0,
                    },
                    setEnabled: {
                      minArgs: 2,
                      maxArgs: 2,
                    },
                    uninstallSelf: {
                      minArgs: 0,
                      maxArgs: 1,
                    },
                  },
                  notifications: {
                    clear: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    create: {
                      minArgs: 1,
                      maxArgs: 2,
                    },
                    getAll: {
                      minArgs: 0,
                      maxArgs: 0,
                    },
                    getPermissionLevel: {
                      minArgs: 0,
                      maxArgs: 0,
                    },
                    update: {
                      minArgs: 2,
                      maxArgs: 2,
                    },
                  },
                  pageAction: {
                    getPopup: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    getTitle: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    hide: {
                      minArgs: 1,
                      maxArgs: 1,
                      fallbackToNoCallback: true,
                    },
                    setIcon: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    setPopup: {
                      minArgs: 1,
                      maxArgs: 1,
                      fallbackToNoCallback: true,
                    },
                    setTitle: {
                      minArgs: 1,
                      maxArgs: 1,
                      fallbackToNoCallback: true,
                    },
                    show: {
                      minArgs: 1,
                      maxArgs: 1,
                      fallbackToNoCallback: true,
                    },
                  },
                  permissions: {
                    contains: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    getAll: {
                      minArgs: 0,
                      maxArgs: 0,
                    },
                    remove: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    request: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                  },
                  runtime: {
                    getBackgroundPage: {
                      minArgs: 0,
                      maxArgs: 0,
                    },
                    getPlatformInfo: {
                      minArgs: 0,
                      maxArgs: 0,
                    },
                    openOptionsPage: {
                      minArgs: 0,
                      maxArgs: 0,
                    },
                    requestUpdateCheck: {
                      minArgs: 0,
                      maxArgs: 0,
                    },
                    sendMessage: {
                      minArgs: 1,
                      maxArgs: 3,
                    },
                    sendNativeMessage: {
                      minArgs: 2,
                      maxArgs: 2,
                    },
                    setUninstallURL: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                  },
                  sessions: {
                    getDevices: {
                      minArgs: 0,
                      maxArgs: 1,
                    },
                    getRecentlyClosed: {
                      minArgs: 0,
                      maxArgs: 1,
                    },
                    restore: {
                      minArgs: 0,
                      maxArgs: 1,
                    },
                  },
                  storage: {
                    local: {
                      clear: {
                        minArgs: 0,
                        maxArgs: 0,
                      },
                      get: {
                        minArgs: 0,
                        maxArgs: 1,
                      },
                      getBytesInUse: {
                        minArgs: 0,
                        maxArgs: 1,
                      },
                      remove: {
                        minArgs: 1,
                        maxArgs: 1,
                      },
                      set: {
                        minArgs: 1,
                        maxArgs: 1,
                      },
                    },
                    managed: {
                      get: {
                        minArgs: 0,
                        maxArgs: 1,
                      },
                      getBytesInUse: {
                        minArgs: 0,
                        maxArgs: 1,
                      },
                    },
                    sync: {
                      clear: {
                        minArgs: 0,
                        maxArgs: 0,
                      },
                      get: {
                        minArgs: 0,
                        maxArgs: 1,
                      },
                      getBytesInUse: {
                        minArgs: 0,
                        maxArgs: 1,
                      },
                      remove: {
                        minArgs: 1,
                        maxArgs: 1,
                      },
                      set: {
                        minArgs: 1,
                        maxArgs: 1,
                      },
                    },
                  },
                  tabs: {
                    captureVisibleTab: {
                      minArgs: 0,
                      maxArgs: 2,
                    },
                    create: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    detectLanguage: {
                      minArgs: 0,
                      maxArgs: 1,
                    },
                    discard: {
                      minArgs: 0,
                      maxArgs: 1,
                    },
                    duplicate: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    executeScript: {
                      minArgs: 1,
                      maxArgs: 2,
                    },
                    get: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    getCurrent: {
                      minArgs: 0,
                      maxArgs: 0,
                    },
                    getZoom: {
                      minArgs: 0,
                      maxArgs: 1,
                    },
                    getZoomSettings: {
                      minArgs: 0,
                      maxArgs: 1,
                    },
                    goBack: {
                      minArgs: 0,
                      maxArgs: 1,
                    },
                    goForward: {
                      minArgs: 0,
                      maxArgs: 1,
                    },
                    highlight: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    insertCSS: {
                      minArgs: 1,
                      maxArgs: 2,
                    },
                    move: {
                      minArgs: 2,
                      maxArgs: 2,
                    },
                    query: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    reload: {
                      minArgs: 0,
                      maxArgs: 2,
                    },
                    remove: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    removeCSS: {
                      minArgs: 1,
                      maxArgs: 2,
                    },
                    sendMessage: {
                      minArgs: 2,
                      maxArgs: 3,
                    },
                    setZoom: {
                      minArgs: 1,
                      maxArgs: 2,
                    },
                    setZoomSettings: {
                      minArgs: 1,
                      maxArgs: 2,
                    },
                    update: {
                      minArgs: 1,
                      maxArgs: 2,
                    },
                  },
                  topSites: {
                    get: {
                      minArgs: 0,
                      maxArgs: 0,
                    },
                  },
                  webNavigation: {
                    getAllFrames: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    getFrame: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                  },
                  webRequest: {
                    handlerBehaviorChanged: {
                      minArgs: 0,
                      maxArgs: 0,
                    },
                  },
                  windows: {
                    create: {
                      minArgs: 0,
                      maxArgs: 1,
                    },
                    get: {
                      minArgs: 1,
                      maxArgs: 2,
                    },
                    getAll: {
                      minArgs: 0,
                      maxArgs: 1,
                    },
                    getCurrent: {
                      minArgs: 0,
                      maxArgs: 1,
                    },
                    getLastFocused: {
                      minArgs: 0,
                      maxArgs: 1,
                    },
                    remove: {
                      minArgs: 1,
                      maxArgs: 1,
                    },
                    update: {
                      minArgs: 2,
                      maxArgs: 2,
                    },
                  },
                };

                if (Object.keys(apiMetadata).length === 0) {
                  throw new Error(
                    "api-metadata.json has not been included in browser-polyfill"
                  );
                }
                /**
                 * A WeakMap subclass which creates and stores a value for any key which does
                 * not exist when accessed, but behaves exactly as an ordinary WeakMap
                 * otherwise.
                 *
                 * @param {function} createItem
                 *        A function which will be called in order to create the value for any
                 *        key which does not exist, the first time it is accessed. The
                 *        function receives, as its only argument, the key being created.
                 */

                class DefaultWeakMap extends WeakMap {
                  constructor(createItem, items = undefined) {
                    super(items);
                    this.createItem = createItem;
                  }

                  get(key) {
                    if (!this.has(key)) {
                      this.set(key, this.createItem(key));
                    }

                    return super.get(key);
                  }
                }
                /**
                 * Returns true if the given object is an object with a `then` method, and can
                 * therefore be assumed to behave as a Promise.
                 *
                 * @param {*} value The value to test.
                 * @returns {boolean} True if the value is thenable.
                 */

                const isThenable = (value) => {
                  return (
                    value &&
                    typeof value === "object" &&
                    typeof value.then === "function"
                  );
                };
                /**
                 * Creates and returns a function which, when called, will resolve or reject
                 * the given promise based on how it is called:
                 *
                 * - If, when called, `chrome.runtime.lastError` contains a non-null object,
                 *   the promise is rejected with that value.
                 * - If the function is called with exactly one argument, the promise is
                 *   resolved to that value.
                 * - Otherwise, the promise is resolved to an array containing all of the
                 *   function's arguments.
                 *
                 * @param {object} promise
                 *        An object containing the resolution and rejection functions of a
                 *        promise.
                 * @param {function} promise.resolve
                 *        The promise's resolution function.
                 * @param {function} promise.reject
                 *        The promise's rejection function.
                 * @param {object} metadata
                 *        Metadata about the wrapped method which has created the callback.
                 * @param {boolean} metadata.singleCallbackArg
                 *        Whether or not the promise is resolved with only the first
                 *        argument of the callback, alternatively an array of all the
                 *        callback arguments is resolved. By default, if the callback
                 *        function is invoked with only a single argument, that will be
                 *        resolved to the promise, while all arguments will be resolved as
                 *        an array if multiple are given.
                 *
                 * @returns {function}
                 *        The generated callback function.
                 */

                const makeCallback = (promise, metadata) => {
                  return (...callbackArgs) => {
                    if (extensionAPIs.runtime.lastError) {
                      promise.reject(
                        new Error(extensionAPIs.runtime.lastError.message)
                      );
                    } else if (
                      metadata.singleCallbackArg ||
                      (callbackArgs.length <= 1 &&
                        metadata.singleCallbackArg !== false)
                    ) {
                      promise.resolve(callbackArgs[0]);
                    } else {
                      promise.resolve(callbackArgs);
                    }
                  };
                };

                const pluralizeArguments = (numArgs) =>
                  numArgs == 1 ? "argument" : "arguments";
                /**
                 * Creates a wrapper function for a method with the given name and metadata.
                 *
                 * @param {string} name
                 *        The name of the method which is being wrapped.
                 * @param {object} metadata
                 *        Metadata about the method being wrapped.
                 * @param {integer} metadata.minArgs
                 *        The minimum number of arguments which must be passed to the
                 *        function. If called with fewer than this number of arguments, the
                 *        wrapper will raise an exception.
                 * @param {integer} metadata.maxArgs
                 *        The maximum number of arguments which may be passed to the
                 *        function. If called with more than this number of arguments, the
                 *        wrapper will raise an exception.
                 * @param {boolean} metadata.singleCallbackArg
                 *        Whether or not the promise is resolved with only the first
                 *        argument of the callback, alternatively an array of all the
                 *        callback arguments is resolved. By default, if the callback
                 *        function is invoked with only a single argument, that will be
                 *        resolved to the promise, while all arguments will be resolved as
                 *        an array if multiple are given.
                 *
                 * @returns {function(object, ...*)}
                 *       The generated wrapper function.
                 */

                const wrapAsyncFunction = (name, metadata) => {
                  return function asyncFunctionWrapper(target, ...args) {
                    if (args.length < metadata.minArgs) {
                      throw new Error(
                        `Expected at least ${
                          metadata.minArgs
                        } ${pluralizeArguments(
                          metadata.minArgs
                        )} for ${name}(), got ${args.length}`
                      );
                    }

                    if (args.length > metadata.maxArgs) {
                      throw new Error(
                        `Expected at most ${
                          metadata.maxArgs
                        } ${pluralizeArguments(
                          metadata.maxArgs
                        )} for ${name}(), got ${args.length}`
                      );
                    }

                    return new Promise((resolve, reject) => {
                      if (metadata.fallbackToNoCallback) {
                        // This API method has currently no callback on Chrome, but it return a promise on Firefox,
                        // and so the polyfill will try to call it with a callback first, and it will fallback
                        // to not passing the callback if the first call fails.
                        try {
                          target[name](
                            ...args,
                            makeCallback(
                              {
                                resolve,
                                reject,
                              },
                              metadata
                            )
                          );
                        } catch (cbError) {
                          console.warn(
                            `${name} API method doesn't seem to support the callback parameter, ` +
                              "falling back to call it without a callback: ",
                            cbError
                          );
                          target[name](...args); // Update the API method metadata, so that the next API calls will not try to
                          // use the unsupported callback anymore.

                          metadata.fallbackToNoCallback = false;
                          metadata.noCallback = true;
                          resolve();
                        }
                      } else if (metadata.noCallback) {
                        target[name](...args);
                        resolve();
                      } else {
                        target[name](
                          ...args,
                          makeCallback(
                            {
                              resolve,
                              reject,
                            },
                            metadata
                          )
                        );
                      }
                    });
                  };
                };
                /**
                 * Wraps an existing method of the target object, so that calls to it are
                 * intercepted by the given wrapper function. The wrapper function receives,
                 * as its first argument, the original `target` object, followed by each of
                 * the arguments passed to the original method.
                 *
                 * @param {object} target
                 *        The original target object that the wrapped method belongs to.
                 * @param {function} method
                 *        The method being wrapped. This is used as the target of the Proxy
                 *        object which is created to wrap the method.
                 * @param {function} wrapper
                 *        The wrapper function which is called in place of a direct invocation
                 *        of the wrapped method.
                 *
                 * @returns {Proxy<function>}
                 *        A Proxy object for the given method, which invokes the given wrapper
                 *        method in its place.
                 */

                const wrapMethod = (target, method, wrapper) => {
                  return new Proxy(method, {
                    apply(targetMethod, thisObj, args) {
                      return wrapper.call(thisObj, target, ...args);
                    },
                  });
                };

                let hasOwnProperty = Function.call.bind(
                  Object.prototype.hasOwnProperty
                );
                /**
                 * Wraps an object in a Proxy which intercepts and wraps certain methods
                 * based on the given `wrappers` and `metadata` objects.
                 *
                 * @param {object} target
                 *        The target object to wrap.
                 *
                 * @param {object} [wrappers = {}]
                 *        An object tree containing wrapper functions for special cases. Any
                 *        function present in this object tree is called in place of the
                 *        method in the same location in the `target` object tree. These
                 *        wrapper methods are invoked as described in {@see wrapMethod}.
                 *
                 * @param {object} [metadata = {}]
                 *        An object tree containing metadata used to automatically generate
                 *        Promise-based wrapper functions for asynchronous. Any function in
                 *        the `target` object tree which has a corresponding metadata object
                 *        in the same location in the `metadata` tree is replaced with an
                 *        automatically-generated wrapper function, as described in
                 *        {@see wrapAsyncFunction}
                 *
                 * @returns {Proxy<object>}
                 */

                const wrapObject = (target, wrappers = {}, metadata = {}) => {
                  let cache = Object.create(null);
                  let handlers = {
                    has(proxyTarget, prop) {
                      return prop in target || prop in cache;
                    },

                    get(proxyTarget, prop, receiver) {
                      if (prop in cache) {
                        return cache[prop];
                      }

                      if (!(prop in target)) {
                        return undefined;
                      }

                      let value = target[prop];

                      if (typeof value === "function") {
                        // This is a method on the underlying object. Check if we need to do
                        // any wrapping.
                        if (typeof wrappers[prop] === "function") {
                          // We have a special-case wrapper for this method.
                          value = wrapMethod(
                            target,
                            target[prop],
                            wrappers[prop]
                          );
                        } else if (hasOwnProperty(metadata, prop)) {
                          // This is an async method that we have metadata for. Create a
                          // Promise wrapper for it.
                          let wrapper = wrapAsyncFunction(prop, metadata[prop]);
                          value = wrapMethod(target, target[prop], wrapper);
                        } else {
                          // This is a method that we don't know or care about. Return the
                          // original method, bound to the underlying object.
                          value = value.bind(target);
                        }
                      } else if (
                        typeof value === "object" &&
                        value !== null &&
                        (hasOwnProperty(wrappers, prop) ||
                          hasOwnProperty(metadata, prop))
                      ) {
                        // This is an object that we need to do some wrapping for the children
                        // of. Create a sub-object wrapper for it with the appropriate child
                        // metadata.
                        value = wrapObject(
                          value,
                          wrappers[prop],
                          metadata[prop]
                        );
                      } else if (hasOwnProperty(metadata, "*")) {
                        // Wrap all properties in * namespace.
                        value = wrapObject(
                          value,
                          wrappers[prop],
                          metadata["*"]
                        );
                      } else {
                        // We don't need to do any wrapping for this property,
                        // so just forward all access to the underlying object.
                        Object.defineProperty(cache, prop, {
                          configurable: true,
                          enumerable: true,

                          get() {
                            return target[prop];
                          },

                          set(value) {
                            target[prop] = value;
                          },
                        });
                        return value;
                      }

                      cache[prop] = value;
                      return value;
                    },

                    set(proxyTarget, prop, value, receiver) {
                      if (prop in cache) {
                        cache[prop] = value;
                      } else {
                        target[prop] = value;
                      }

                      return true;
                    },

                    defineProperty(proxyTarget, prop, desc) {
                      return Reflect.defineProperty(cache, prop, desc);
                    },

                    deleteProperty(proxyTarget, prop) {
                      return Reflect.deleteProperty(cache, prop);
                    },
                  }; // Per contract of the Proxy API, the "get" proxy handler must return the
                  // original value of the target if that value is declared read-only and
                  // non-configurable. For this reason, we create an object with the
                  // prototype set to `target` instead of using `target` directly.
                  // Otherwise we cannot return a custom object for APIs that
                  // are declared read-only and non-configurable, such as `chrome.devtools`.
                  //
                  // The proxy handlers themselves will still use the original `target`
                  // instead of the `proxyTarget`, so that the methods and properties are
                  // dereferenced via the original targets.

                  let proxyTarget = Object.create(target);
                  return new Proxy(proxyTarget, handlers);
                };
                /**
                 * Creates a set of wrapper functions for an event object, which handles
                 * wrapping of listener functions that those messages are passed.
                 *
                 * A single wrapper is created for each listener function, and stored in a
                 * map. Subsequent calls to `addListener`, `hasListener`, or `removeListener`
                 * retrieve the original wrapper, so that  attempts to remove a
                 * previously-added listener work as expected.
                 *
                 * @param {DefaultWeakMap<function, function>} wrapperMap
                 *        A DefaultWeakMap object which will create the appropriate wrapper
                 *        for a given listener function when one does not exist, and retrieve
                 *        an existing one when it does.
                 *
                 * @returns {object}
                 */

                const wrapEvent = (wrapperMap) => ({
                  addListener(target, listener, ...args) {
                    target.addListener(wrapperMap.get(listener), ...args);
                  },

                  hasListener(target, listener) {
                    return target.hasListener(wrapperMap.get(listener));
                  },

                  removeListener(target, listener) {
                    target.removeListener(wrapperMap.get(listener));
                  },
                });

                const onRequestFinishedWrappers = new DefaultWeakMap(
                  (listener) => {
                    if (typeof listener !== "function") {
                      return listener;
                    }
                    /**
                     * Wraps an onRequestFinished listener function so that it will return a
                     * `getContent()` property which returns a `Promise` rather than using a
                     * callback API.
                     *
                     * @param {object} req
                     *        The HAR entry object representing the network request.
                     */

                    return function onRequestFinished(req) {
                      const wrappedReq = wrapObject(
                        req,
                        {},
                        /* wrappers */
                        {
                          getContent: {
                            minArgs: 0,
                            maxArgs: 0,
                          },
                        }
                      );
                      listener(wrappedReq);
                    };
                  }
                ); // Keep track if the deprecation warning has been logged at least once.

                let loggedSendResponseDeprecationWarning = false;
                const onMessageWrappers = new DefaultWeakMap((listener) => {
                  if (typeof listener !== "function") {
                    return listener;
                  }
                  /**
                   * Wraps a message listener function so that it may send responses based on
                   * its return value, rather than by returning a sentinel value and calling a
                   * callback. If the listener function returns a Promise, the response is
                   * sent when the promise either resolves or rejects.
                   *
                   * @param {*} message
                   *        The message sent by the other end of the channel.
                   * @param {object} sender
                   *        Details about the sender of the message.
                   * @param {function(*)} sendResponse
                   *        A callback which, when called with an arbitrary argument, sends
                   *        that value as a response.
                   * @returns {boolean}
                   *        True if the wrapped listener returned a Promise, which will later
                   *        yield a response. False otherwise.
                   */

                  return function onMessage(message, sender, sendResponse) {
                    let didCallSendResponse = false;
                    let wrappedSendResponse;
                    let sendResponsePromise = new Promise((resolve) => {
                      wrappedSendResponse = function (response) {
                        if (!loggedSendResponseDeprecationWarning) {
                          console.warn(
                            SEND_RESPONSE_DEPRECATION_WARNING,
                            new Error().stack
                          );
                          loggedSendResponseDeprecationWarning = true;
                        }

                        didCallSendResponse = true;
                        resolve(response);
                      };
                    });
                    let result;

                    try {
                      result = listener(message, sender, wrappedSendResponse);
                    } catch (err) {
                      result = Promise.reject(err);
                    }

                    const isResultThenable =
                      result !== true && isThenable(result); // If the listener didn't returned true or a Promise, or called
                    // wrappedSendResponse synchronously, we can exit earlier
                    // because there will be no response sent from this listener.

                    if (
                      result !== true &&
                      !isResultThenable &&
                      !didCallSendResponse
                    ) {
                      return false;
                    } // A small helper to send the message if the promise resolves
                    // and an error if the promise rejects (a wrapped sendMessage has
                    // to translate the message into a resolved promise or a rejected
                    // promise).

                    const sendPromisedResult = (promise) => {
                      promise
                        .then(
                          (msg) => {
                            // send the message value.
                            sendResponse(msg);
                          },
                          (error) => {
                            // Send a JSON representation of the error if the rejected value
                            // is an instance of error, or the object itself otherwise.
                            let message;

                            if (
                              error &&
                              (error instanceof Error ||
                                typeof error.message === "string")
                            ) {
                              message = error.message;
                            } else {
                              message = "An unexpected error occurred";
                            }

                            sendResponse({
                              __mozWebExtensionPolyfillReject__: true,
                              message,
                            });
                          }
                        )
                        .catch((err) => {
                          // Print an error on the console if unable to send the response.
                          console.error(
                            "Failed to send onMessage rejected reply",
                            err
                          );
                        });
                    }; // If the listener returned a Promise, send the resolved value as a
                    // result, otherwise wait the promise related to the wrappedSendResponse
                    // callback to resolve and send it as a response.

                    if (isResultThenable) {
                      sendPromisedResult(result);
                    } else {
                      sendPromisedResult(sendResponsePromise);
                    } // Let Chrome know that the listener is replying.

                    return true;
                  };
                });

                const wrappedSendMessageCallback = (
                  { reject, resolve },
                  reply
                ) => {
                  if (extensionAPIs.runtime.lastError) {
                    // Detect when none of the listeners replied to the sendMessage call and resolve
                    // the promise to undefined as in Firefox.
                    // See https://github.com/mozilla/webextension-polyfill/issues/130
                    if (
                      extensionAPIs.runtime.lastError.message ===
                      CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE
                    ) {
                      resolve();
                    } else {
                      reject(
                        new Error(extensionAPIs.runtime.lastError.message)
                      );
                    }
                  } else if (reply && reply.__mozWebExtensionPolyfillReject__) {
                    // Convert back the JSON representation of the error into
                    // an Error instance.
                    reject(new Error(reply.message));
                  } else {
                    resolve(reply);
                  }
                };

                const wrappedSendMessage = (
                  name,
                  metadata,
                  apiNamespaceObj,
                  ...args
                ) => {
                  if (args.length < metadata.minArgs) {
                    throw new Error(
                      `Expected at least ${
                        metadata.minArgs
                      } ${pluralizeArguments(
                        metadata.minArgs
                      )} for ${name}(), got ${args.length}`
                    );
                  }

                  if (args.length > metadata.maxArgs) {
                    throw new Error(
                      `Expected at most ${
                        metadata.maxArgs
                      } ${pluralizeArguments(
                        metadata.maxArgs
                      )} for ${name}(), got ${args.length}`
                    );
                  }

                  return new Promise((resolve, reject) => {
                    const wrappedCb = wrappedSendMessageCallback.bind(null, {
                      resolve,
                      reject,
                    });
                    args.push(wrappedCb);
                    apiNamespaceObj.sendMessage(...args);
                  });
                };

                const staticWrappers = {
                  devtools: {
                    network: {
                      onRequestFinished: wrapEvent(onRequestFinishedWrappers),
                    },
                  },
                  runtime: {
                    onMessage: wrapEvent(onMessageWrappers),
                    onMessageExternal: wrapEvent(onMessageWrappers),
                    sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
                      minArgs: 1,
                      maxArgs: 3,
                    }),
                  },
                  tabs: {
                    sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
                      minArgs: 2,
                      maxArgs: 3,
                    }),
                  },
                };
                const settingMetadata = {
                  clear: {
                    minArgs: 1,
                    maxArgs: 1,
                  },
                  get: {
                    minArgs: 1,
                    maxArgs: 1,
                  },
                  set: {
                    minArgs: 1,
                    maxArgs: 1,
                  },
                };
                apiMetadata.privacy = {
                  network: {
                    "*": settingMetadata,
                  },
                  services: {
                    "*": settingMetadata,
                  },
                  websites: {
                    "*": settingMetadata,
                  },
                };
                return wrapObject(extensionAPIs, staticWrappers, apiMetadata);
              }; // The build process adds a UMD wrapper around this file, which makes the
              // `module` variable available.

              module.exports = wrapAPIs(chrome);
            } else {
              module.exports = globalThis.browser;
            }
          }
        );
        //# sourceMappingURL=browser-polyfill.js.map

        /***/
      },

    /******/
  };
  /************************************************************************/
  /******/ // The module cache
  /******/ var __webpack_module_cache__ = {};
  /******/
  /******/ // The require function
  /******/ function __webpack_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/ var cachedModule = __webpack_module_cache__[moduleId];
    /******/ if (cachedModule !== undefined) {
      /******/ return cachedModule.exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (__webpack_module_cache__[moduleId] = {
      /******/ // no module.id needed
      /******/ // no module.loaded needed
      /******/ exports: {},
      /******/
    });
    /******/
    /******/ // Execute the module function
    /******/ __webpack_modules__[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__
    );
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports;
    /******/
  }
  /******/
  /************************************************************************/
  /******/ /* webpack/runtime/compat get default export */
  /******/ (() => {
    /******/ // getDefaultExport function for compatibility with non-harmony modules
    /******/ __webpack_require__.n = (module) => {
      /******/ var getter =
        module && module.__esModule
          ? /******/ () => module["default"]
          : /******/ () => module;
      /******/ __webpack_require__.d(getter, { a: getter });
      /******/ return getter;
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/define property getters */
  /******/ (() => {
    /******/ // define getter functions for harmony exports
    /******/ __webpack_require__.d = (exports, definition) => {
      /******/ for (var key in definition) {
        /******/ if (
          __webpack_require__.o(definition, key) &&
          !__webpack_require__.o(exports, key)
        ) {
          /******/ Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key],
          });
          /******/
        }
        /******/
      }
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/hasOwnProperty shorthand */
  /******/ (() => {
    /******/ __webpack_require__.o = (obj, prop) =>
      Object.prototype.hasOwnProperty.call(obj, prop);
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/make namespace object */
  /******/ (() => {
    /******/ // define __esModule on exports
    /******/ __webpack_require__.r = (exports) => {
      /******/ if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
        /******/ Object.defineProperty(exports, Symbol.toStringTag, {
          value: "Module",
        });
        /******/
      }
      /******/ Object.defineProperty(exports, "__esModule", { value: true });
      /******/
    };
    /******/
  })();
  /******/
  /************************************************************************/
  var __webpack_exports__ = {};
  // This entry need to be wrapped in an IIFE because it need to be in strict mode.
  (() => {
    "use strict";
    /*!*********************************!*\
  !*** ./content-script/index.ts ***!
  \*********************************/
    __webpack_require__.r(__webpack_exports__);
    /* harmony import */ var _interface_inject__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(
        /*! ./interface-inject */ "./content-script/interface-inject.ts"
      );
    /* harmony import */ var _messages_proxy__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(
        /*! ./messages-proxy */ "./content-script/messages-proxy.ts"
      );
    // Copyright (c) 2022, Mysten Labs, Inc.
    // SPDX-License-Identifier: Apache-2.0

    (0, _interface_inject__WEBPACK_IMPORTED_MODULE_0__.injectDappInterface)();
    (0, _messages_proxy__WEBPACK_IMPORTED_MODULE_1__.setupMessagesProxy)();
  })();

  /******/
})();
//# sourceMappingURL=content-script.js.map
