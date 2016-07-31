/**
 * Copyright (c) 2016 Samsung Electronics, Inc.,
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * * Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 * * Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
"use strict";

const log = require('../util/logging');
const database = require("../util/database");
const route = require('./route');

exports.getProjectList = function(req, res) {
    const sql = "SELECT projectName, projectType, groupName, language   "+
                "FROM ProjectInfo                                       "+
                "ORDER BY projectName ASC                               ";
    route.executeSqlAndSendResponseRows(sql, res);
};

exports.getGroupList = function(req, res) {
    const sql = "SELECT DISTINCT groupName FROM ProjectInfo ORDER BY groupName ASC";
    route.executeSqlAndSendResponseRows(sql, res);
};

exports.getDatabaseNameByProjectName = function(projectName) {
    const sql = "SELECT DISTINCT dbName FROM ProjectInfo WHERE projectName=" + projectName;
    return database.exec(sql)
        .then((rows) => {
            return rows[0].dbName;
        })
        .catch((err) => {
            log.error(err);
            return null;
        });
};

exports.getDatabaseNameListByGroupName = function(groupName) {
    const sql = "SELECT DISTINCT dbName FROM ProjectInfo WHERE groupName=" + groupName;
    return database.exec(sql)
        .then((rows) => {
            return rows;
        })
        .catch((err) => {
            log.error(err);
            return [];
        });
};

exports.getDatabaseNameList = function() {
    const sql = "SELECT DISTINCT dbName FROM ProjectInfo";
    return database.exec(sql)
        .then((rows) => {
            return rows;
        })
        .catch((err) => {
            log.error(err);
            return [];
        });
};