(function() {
    var FormBuilder = function(opts) {
        this.options = Object.assign(FormBuilder.defaults, opts);
        this.wrapper = document.createElement('div');
        this.mainForm = document.createElement('form');
        this.mainForm.setAttribute('id', 'form_builder_1');
        this.selectedElement = document.getElementById(opts.selector);
        this.resultEle = document.createElement('span');
        this.formFields = null;
        this.defaultStyle = '.form_fields,.form_label{display:block}.error,.success{color:#fff;opacity:.7}.wrapper-form-builder{width:100%;font-family:calibri}.form_label{font-size:18px}.form_fields input,.form_fields select,.form_fields textarea{width:100%;margin:8px 0;display:inline-block;border:1px solid #ccc;box-shadow:inset 0 1px 3px #ddd;border-radius:4px;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:12px 20px}.form_submit_btn_wrapper button[type=submit]{padding:8px 10px;width:100%;background-color:#41a545;color:#fff;font-size:18px;border:none}#form_builder_spinner{position:fixed;top:0;left:0;background-color:rgba(0,0,0,.5);width:100%;height:100%}#form_builder_spinner img{position:absolute;left:0;right:0;top:0;bottom:0;margin:auto}.form_result_span{padding:8px;margin-top:5px;font-size:18px;font-weight:700;text-align:center;border-radius:5px;display:none}.success{background-color:#41a545}.error{background-color:#f3360e}';
        this.defaultsFields = [{
            type: 'text',
            placeholder: 'First Name',
            required: !0,
            fieldName: 'firstname',
            label: 'First Name'
        }, {
            type: 'text',
            placeholder: 'Last Name',
            required: !0,
            fieldName: 'lastname',
            label: 'Last Name'
        }, {
            type: 'text',
            placeholder: 'Email',
            required: !0,
            fieldName: 'email',
            label: 'Email'
        }];
        if (opts.customFields) {
            this.formFields = opts.fields
        } else {
            this.formFields = this.defaultsFields
        };
        this.submitBtn = document.createElement('button');
        buildForm(this);
        addEvent(this)
    }
    FormBuilder.defaults = {
        selector: '',
        formClass: 'form-builder',
        wrapperClass: 'wrapper-form-builder',
        apiUrl: 'https://script.google.com/macros/s/AKfycbz2Mw1I6YpTNKy1j8V8wvcxh0b7KuSP6ynbwXTCHxRIq5CDmDM/exec',
        customFields: !1,
        btnText: 'Save',
        fields: [],
        method: 'GET',
        customCSS: !1,
        success: function(response) {},
        error: function(error) {},
        notification: !0,
        preloader: !0
    }
    FormBuilder.prototype.addFields = function(fields) {
        for (var i = 0; i < fields.length; i++) {
            var _fw = document.createElement('div');
            var _f, _l = null;
            _fw.classList.add('form_fields');
            if (fields[i].type == 'text') {
                _f = document.createElement('input');
                _f.placeholder = fields[i].placeholder;
                _f.setAttribute('name', fields[i].fieldName);
                if (fields[i].required)
                    _f.setAttribute('required', fields[i].required);
                _f.setAttribute('id', 'form_field_' + (i + 1));
                _l = document.createElement('label');
                _l.setAttribute('for', 'form_field_' + (i + 1));
                _l.classList.add('form_label');
                _l.innerHTML = fields[i].label
            }
            _fw.appendChild(_l);
            _fw.appendChild(_f);
            this.mainForm.appendChild(_fw)
        }
    }
    FormBuilder.prototype.addSubmitBtn = function() {
        let _sbw = document.createElement('div');
        _sbw.classList.add('form_submit_btn_wrapper');
        let _sb = this.submitBtn;
        _sb.setAttribute('type', 'submit');
        _sb.innerHTML = this.options.btnText;
        let _r = this.resultEle;
        _r.classList.add('form_result_span');
        _sbw.appendChild(_sb);
        _sbw.appendChild(_r);
        this.mainForm.appendChild(_sbw)
    }
    FormBuilder.prototype.showSpinner = function() {
        var _s = document.createElement('div');
        _s.setAttribute('id', 'form_builder_spinner');
        var _x = document.createElement("IMG");
        _x.setAttribute("src", "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPgo8c3ZnIHdpZHRoPSI0MHB4IiBoZWlnaHQ9IjQwcHgiIHZpZXdCb3g9IjAgMCA0MCA0MCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWw6c3BhY2U9InByZXNlcnZlIiBzdHlsZT0iZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjEuNDE0MjE7IiB4PSIwcHgiIHk9IjBweCI+CiAgICA8ZGVmcz4KICAgICAgICA8c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwhW0NEQVRBWwogICAgICAgICAgICBALXdlYmtpdC1rZXlmcmFtZXMgc3BpbiB7CiAgICAgICAgICAgICAgZnJvbSB7CiAgICAgICAgICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDBkZWcpCiAgICAgICAgICAgICAgfQogICAgICAgICAgICAgIHRvIHsKICAgICAgICAgICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoLTM1OWRlZykKICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0KICAgICAgICAgICAgQGtleWZyYW1lcyBzcGluIHsKICAgICAgICAgICAgICBmcm9tIHsKICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpCiAgICAgICAgICAgICAgfQogICAgICAgICAgICAgIHRvIHsKICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKC0zNTlkZWcpCiAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAgICAgIHN2ZyB7CiAgICAgICAgICAgICAgICAtd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IDUwJSA1MCU7CiAgICAgICAgICAgICAgICAtd2Via2l0LWFuaW1hdGlvbjogc3BpbiAxLjVzIGxpbmVhciBpbmZpbml0ZTsKICAgICAgICAgICAgICAgIC13ZWJraXQtYmFja2ZhY2UtdmlzaWJpbGl0eTogaGlkZGVuOwogICAgICAgICAgICAgICAgYW5pbWF0aW9uOiBzcGluIDEuNXMgbGluZWFyIGluZmluaXRlOwogICAgICAgICAgICB9CiAgICAgICAgXV0+PC9zdHlsZT4KICAgIDwvZGVmcz4KICAgIDxnIGlkPSJvdXRlciI+CiAgICAgICAgPGc+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0yMCwwQzIyLjIwNTgsMCAyMy45OTM5LDEuNzg4MTMgMjMuOTkzOSwzLjk5MzlDMjMuOTkzOSw2LjE5OTY4IDIyLjIwNTgsNy45ODc4MSAyMCw3Ljk4NzgxQzE3Ljc5NDIsNy45ODc4MSAxNi4wMDYxLDYuMTk5NjggMTYuMDA2MSwzLjk5MzlDMTYuMDA2MSwxLjc4ODEzIDE3Ljc5NDIsMCAyMCwwWiIgc3R5bGU9ImZpbGw6YmxhY2s7Ii8+CiAgICAgICAgPC9nPgogICAgICAgIDxnPgogICAgICAgICAgICA8cGF0aCBkPSJNNS44NTc4Niw1Ljg1Nzg2QzcuNDE3NTgsNC4yOTgxNSA5Ljk0NjM4LDQuMjk4MTUgMTEuNTA2MSw1Ljg1Nzg2QzEzLjA2NTgsNy40MTc1OCAxMy4wNjU4LDkuOTQ2MzggMTEuNTA2MSwxMS41MDYxQzkuOTQ2MzgsMTMuMDY1OCA3LjQxNzU4LDEzLjA2NTggNS44NTc4NiwxMS41MDYxQzQuMjk4MTUsOS45NDYzOCA0LjI5ODE1LDcuNDE3NTggNS44NTc4Niw1Ljg1Nzg2WiIgc3R5bGU9ImZpbGw6cmdiKDIxMCwyMTAsMjEwKTsiLz4KICAgICAgICA8L2c+CiAgICAgICAgPGc+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0yMCwzMi4wMTIyQzIyLjIwNTgsMzIuMDEyMiAyMy45OTM5LDMzLjgwMDMgMjMuOTkzOSwzNi4wMDYxQzIzLjk5MzksMzguMjExOSAyMi4yMDU4LDQwIDIwLDQwQzE3Ljc5NDIsNDAgMTYuMDA2MSwzOC4yMTE5IDE2LjAwNjEsMzYuMDA2MUMxNi4wMDYxLDMzLjgwMDMgMTcuNzk0MiwzMi4wMTIyIDIwLDMyLjAxMjJaIiBzdHlsZT0iZmlsbDpyZ2IoMTMwLDEzMCwxMzApOyIvPgogICAgICAgIDwvZz4KICAgICAgICA8Zz4KICAgICAgICAgICAgPHBhdGggZD0iTTI4LjQ5MzksMjguNDkzOUMzMC4wNTM2LDI2LjkzNDIgMzIuNTgyNCwyNi45MzQyIDM0LjE0MjEsMjguNDkzOUMzNS43MDE5LDMwLjA1MzYgMzUuNzAxOSwzMi41ODI0IDM0LjE0MjEsMzQuMTQyMUMzMi41ODI0LDM1LjcwMTkgMzAuMDUzNiwzNS43MDE5IDI4LjQ5MzksMzQuMTQyMUMyNi45MzQyLDMyLjU4MjQgMjYuOTM0MiwzMC4wNTM2IDI4LjQ5MzksMjguNDkzOVoiIHN0eWxlPSJmaWxsOnJnYigxMDEsMTAxLDEwMSk7Ii8+CiAgICAgICAgPC9nPgogICAgICAgIDxnPgogICAgICAgICAgICA8cGF0aCBkPSJNMy45OTM5LDE2LjAwNjFDNi4xOTk2OCwxNi4wMDYxIDcuOTg3ODEsMTcuNzk0MiA3Ljk4NzgxLDIwQzcuOTg3ODEsMjIuMjA1OCA2LjE5OTY4LDIzLjk5MzkgMy45OTM5LDIzLjk5MzlDMS43ODgxMywyMy45OTM5IDAsMjIuMjA1OCAwLDIwQzAsMTcuNzk0MiAxLjc4ODEzLDE2LjAwNjEgMy45OTM5LDE2LjAwNjFaIiBzdHlsZT0iZmlsbDpyZ2IoMTg3LDE4NywxODcpOyIvPgogICAgICAgIDwvZz4KICAgICAgICA8Zz4KICAgICAgICAgICAgPHBhdGggZD0iTTUuODU3ODYsMjguNDkzOUM3LjQxNzU4LDI2LjkzNDIgOS45NDYzOCwyNi45MzQyIDExLjUwNjEsMjguNDkzOUMxMy4wNjU4LDMwLjA1MzYgMTMuMDY1OCwzMi41ODI0IDExLjUwNjEsMzQuMTQyMUM5Ljk0NjM4LDM1LjcwMTkgNy40MTc1OCwzNS43MDE5IDUuODU3ODYsMzQuMTQyMUM0LjI5ODE1LDMyLjU4MjQgNC4yOTgxNSwzMC4wNTM2IDUuODU3ODYsMjguNDkzOVoiIHN0eWxlPSJmaWxsOnJnYigxNjQsMTY0LDE2NCk7Ii8+CiAgICAgICAgPC9nPgogICAgICAgIDxnPgogICAgICAgICAgICA8cGF0aCBkPSJNMzYuMDA2MSwxNi4wMDYxQzM4LjIxMTksMTYuMDA2MSA0MCwxNy43OTQyIDQwLDIwQzQwLDIyLjIwNTggMzguMjExOSwyMy45OTM5IDM2LjAwNjEsMjMuOTkzOUMzMy44MDAzLDIzLjk5MzkgMzIuMDEyMiwyMi4yMDU4IDMyLjAxMjIsMjBDMzIuMDEyMiwxNy43OTQyIDMzLjgwMDMsMTYuMDA2MSAzNi4wMDYxLDE2LjAwNjFaIiBzdHlsZT0iZmlsbDpyZ2IoNzQsNzQsNzQpOyIvPgogICAgICAgIDwvZz4KICAgICAgICA8Zz4KICAgICAgICAgICAgPHBhdGggZD0iTTI4LjQ5MzksNS44NTc4NkMzMC4wNTM2LDQuMjk4MTUgMzIuNTgyNCw0LjI5ODE1IDM0LjE0MjEsNS44NTc4NkMzNS43MDE5LDcuNDE3NTggMzUuNzAxOSw5Ljk0NjM4IDM0LjE0MjEsMTEuNTA2MUMzMi41ODI0LDEzLjA2NTggMzAuMDUzNiwxMy4wNjU4IDI4LjQ5MzksMTEuNTA2MUMyNi45MzQyLDkuOTQ2MzggMjYuOTM0Miw3LjQxNzU4IDI4LjQ5MzksNS44NTc4NloiIHN0eWxlPSJmaWxsOnJnYig1MCw1MCw1MCk7Ii8+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K");
        _s.appendChild(_x);
        document.body.appendChild(_s)
    }
    FormBuilder.prototype.hideSpinner = function() {
        var x = document.getElementById('form_builder_spinner');
        x.remove()
    }
    FormBuilder.prototype.style = function() {
        if (!this.options.customCSS) {
            var _h = document.getElementsByTagName("head")[0];
            var _st = document.createElement('style');
            _st.innerHTML = this.defaultStyle;
            _h.appendChild(_st)
        }
    }

    function buildForm(_f) {
        _f.style();
        _f.addFields(_f.formFields);
        _f.wrapper.appendChild(_f.mainForm);
        _f.wrapper.classList.add(_f.options.wrapperClass);
        _f.selectedElement.appendChild(_f.wrapper);
        _f.addSubmitBtn()
    }

    function addEvent(_f) {
        _f.mainForm.addEventListener('submit', function(e) {
            e.preventDefault();
            (_f.options.preloader) ? _f.showSpinner(): console.log('Preloader is disabled');
            _f.resultEle.classList.remove('success');
            _f.resultEle.classList.remove('error');
            var _fv = {};
            var _e = _f.mainForm.querySelectorAll('input', 'select', 'textarea');
            for (var i = 0; i < _e.length; i++) {
                if (_e[i].name)
                    _fv[_e[i].name] = _e[i].value
            }
            ajax.request(_f.options.apiUrl, _f.options.method, _fv, function(data) {
                (_f.options.preloader) ? _f.hideSpinner(): '';
                _f.mainForm.reset();
                if (_f.options.notification) {
                    _f.resultEle.classList.add('success');
                    _f.resultEle.innerHTML = _f.options.btnText + 'ed';
                    _f.resultEle.style.display = "block"
                } else {
                    console.log('Notification is disabled')
                }
                _f.options.success(data, _f)
            }, function(error) {
                (_f.options.preloader) ? _f.hideSpinner(): '';
                if (_f.options.notification) {
                    _f.resultEle.classList.add('error');
                    _f.resultEle.innerHTML = 'Error' + error;
                    _f.resultEle.style.display = "block"
                } else {
                    console.log('Notification is disabled')
                }
                _f.options.error(error)
            }, !0)
        })
    }
    serialize = function(obj) {
        var str = [];
        for (var p in obj)
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]))
            }
        return str.join("&")
    }
    var ajax = {
        xhr: null,
        request: function(url, method, data, success, failure, async) {
            if (!this.xhr) {
                this.xhr = window.ActiveX ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest()
            }
            var self = this.xhr;
            self.onreadystatechange = function() {
                if (self.readyState === 4 && self.status === 200) {
                    var response = JSON.parse(self.responseText);
                    success(response)
                } else if (self.readyState === 4) {
                    failure(self.responseText)
                }
            };
            if (method === "GET" && typeof data !== 'undefined' && data !== null) {
                url += '?' + serialize(data)
            }
            this.xhr.open(method, url, async);
            if (navigator.onLine) {
                if (method === "GET") {
                    this.xhr.send()
                } else {
                    this.xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                    this.xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8   ');
                    this.xhr.send(JSON.stringify(data))
                }
            } else {
                failure('Problem in internet connection')
            }
        }
    }
    window.FormBuilder = FormBuilder
})()