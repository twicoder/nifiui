/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
nf.CanvasHeader = (function () {

    var config = {
        urls: {
            helpDocument: '../nifi-docs/documentation',
            controllerAbout: '../nifi-api/controller/about'
        }
    };

    return {
        /**
         * Initialize the canvas header.
         */
        init: function () {
            // mouse over for the reporting link
            nf.Common.addHoverEffect('#reporting-link', 'reporting-link', 'reporting-link-hover').click(function () {
                nf.Shell.showPage('summary');
            });

            // mouse over for the counters link
            nf.Common.addHoverEffect('#counters-link', 'counters-link', 'counters-link-hover').click(function () {
                nf.Shell.showPage('counters');
            });

            // mouse over for the history link
            nf.Common.addHoverEffect('#history-link', 'history-link', 'history-link-hover').click(function () {
                nf.Shell.showPage('history');
            });

            // mouse over for the provenance link
            if (nf.Common.canAccessProvenance()) {
                nf.Common.addHoverEffect('#provenance-link', 'provenance-link', 'provenance-link-hover').click(function () {
                    nf.Shell.showPage('provenance');
                });
            } else {
                $('#provenance-link').addClass('provenance-link-disabled');
            }

            // mouse over for the templates link
            nf.Common.addHoverEffect('#templates-link', 'templates-link', 'templates-link-hover').click(function () {
                nf.Shell.showPage('templates');
            });

            // mouse over for the flow settings link
            if (nf.Common.isDFM()) {
                nf.Common.addHoverEffect('#flow-settings-link', 'flow-settings-link', 'flow-settings-link-hover').click(function () {
                    nf.Settings.showSettings();
                });
            } else {
                $('#flow-settings-link').addClass('flow-settings-link-disabled');
            }

            // mouse over for the users link
            if (nf.Common.isAdmin()) {
                nf.Common.addHoverEffect('#users-link', 'users-link', 'users-link-hover').click(function () {
                    nf.Shell.showPage('users');
                });
            } else {
                $('#users-link').addClass('users-link-disabled');
            }

            // mouse over for the cluster link
            if (nf.Canvas.isClustered()) {
                nf.Common.addHoverEffect('#cluster-link', 'cluster-link', 'cluster-link-hover').click(function () {
                    nf.Shell.showPage('cluster');
                });

                // show the connected nodes
                $('#connected-nodes-element').show();

                // show the cluster indicator
                $('#cluster-indicator').show();
                $('#data-flow-title-viewport').css('left', '113px');
            } else {
                $('#cluster-link').hide();
            }

            // mouse over for the reporting link
            nf.Common.addHoverEffect('#bulletin-board-link', 'bulletin-board-link', 'bulletin-board-hover').click(function () {
                nf.Shell.showPage('bulletin-board');
            });

            // setup the tooltip for the refresh icon
            $('#refresh-required-icon').qtip($.extend({
                content: 'This flow has been modified by another user. Please refresh.'
            }, nf.CanvasUtils.config.systemTooltipConfig));

            // setup the refresh link actions
            $('#refresh-required-link').click(function () {
                nf.Canvas.reload().done(function () {
                    // update component visibility
                    nf.Canvas.View.updateVisibility();

                    // refresh the birdseye
                    nf.Birdseye.refresh();

                    // hide the refresh link
                    $('#stats-last-refreshed').removeClass('alert');
                    $('#refresh-required-container').hide();
                }).fail(function () {
                    nf.Dialog.showOkDialog({
                        dialogContent: 'Unable to refresh the current group.',
                        overlayBackground: true
                    });
                });
            });

            // get the about details
            $.ajax({
                type: 'GET',
                url: config.urls.controllerAbout,
                dataType: 'json'
            }).done(function (response) {
                var aboutDetails = response.about;
                // set the document title and the about title
                document.title = aboutDetails.title;
                $('#nf-version').text(aboutDetails.version);
            }).fail(nf.Common.handleAjaxError);

            // configure the about dialog
            $('#nf-about').modal({
                overlayBackground: true,
                buttons: [{
                        buttonText: 'Ok',
                        handler: {
                            click: function () {
                                $('#nf-about').modal('hide');
                            }
                        }
                    }]
            });

            // show about dialog
            $('#about-link').click(function () {
                $('#nf-about').modal('show');
            });

            // download the help documentation
            $('#help-link').click(function () {
                nf.Shell.showPage(config.urls.helpDocument);
            });

            // initialize the new template dialog
            $('#new-template-dialog').modal({
                headerText: 'Create Template',
                overlayBackground: false
            });

            // configure the fill color dialog
            $('#fill-color-dialog').modal({
                headerText: 'Fill',
                overlayBackground: false,
                buttons: [{
                        buttonText: 'Apply',
                        handler: {
                            click: function () {
                                // close the dialog
                                $('#fill-color-dialog').modal('hide');

                                // ensure the selection is a processor or label
                                var selection = nf.CanvasUtils.getSelection();
                                if (selection.size() === 1 && (nf.CanvasUtils.isProcessor(selection) || nf.CanvasUtils.isLabel(selection))) {
                                    var revision = nf.Client.getRevision();
                                    var selectionData = selection.datum();

                                    // get the color and update the styles
                                    var color = $('#fill-color-value').val();

                                    // update the style for the specified component
                                    $.ajax({
                                        type: 'PUT',
                                        url: selectionData.component.uri,
                                        data: {
                                            'version': revision.version,
                                            'clientId': revision.clientId,
                                            'style[background-color]': color
                                        },
                                        dataType: 'json'
                                    }).done(function (response) {
                                        // update the revision
                                        nf.Client.setRevision(response.revision);

                                        // update the processor
                                        if (nf.CanvasUtils.isProcessor(selection)) {
                                            nf.Processor.set(response.processor);
                                        } else {
                                            nf.Label.set(response.label);
                                        }
                                    }).fail(function (xhr, status, error) {
                                        if (xhr.status === 400 || xhr.status === 404 || xhr.status === 409) {
                                            nf.Dialog.showOkDialog({
                                                dialogContent: nf.Common.escapeHtml(xhr.responseText),
                                                overlayBackground: true
                                            });
                                        }
                                    });
                                }
                            }
                        }
                    }, {
                        buttonText: 'Cancel',
                        handler: {
                            click: function () {
                                // close the dialog
                                $('#fill-color-dialog').modal('hide');
                            }
                        }
                    }]
            });

            // initialize the fill color picker
            $('#fill-color-value').minicolors({
                inline: true,
                change: function (hex, opacity) {
                    $('#fill-color-processor-preview, #fill-color-label-preview').css({
                        'border-color': hex,
                        'background': 'linear-gradient(to bottom, #ffffff, ' + hex + ')',
                        'filter': 'progid:DXImageTransform.Microsoft.gradient(gradientType=0, startColorstr=#ffffff, endColorstr=' + hex + ')'
                    });
                }
            });

            // mousewheel -> IE, Chrome
            // DOMMouseScroll -> FF
            // wheel -> FF, IE

            // still having issues with this in IE :/
            $('#data-flow-title-viewport').on('DOMMouseScroll mousewheel', function (evt, d) {
                if (nf.Common.isUndefinedOrNull(evt.originalEvent)) {
                    return;
                }

                var title = $('#data-flow-title-container');
                var titlePosition = title.position();
                var titleWidth = title.outerWidth();
                var titleRight = titlePosition.left + titleWidth;

                var padding = $('#breadcrumbs-right-border').width();
                var viewport = $('#data-flow-title-viewport');
                var viewportWidth = viewport.width();
                var viewportRight = viewportWidth - padding;

                // if the width of the title is larger than the viewport
                if (titleWidth > viewportWidth) {
                    var adjust = false;

                    var delta = 0;
                    if (nf.Common.isDefinedAndNotNull(evt.originalEvent.detail)) {
                        delta = -evt.originalEvent.detail;
                    } else if (nf.Common.isDefinedAndNotNull(evnt.originalEvent.wheelDelta)) {
                        delta = evt.originalEvent.wheelDelta;
                    }

                    // determine the increment
                    if (delta > 0 && titleRight > viewportRight) {
                        var increment = -25;
                        adjust = true;
                    } else if (delta < 0 && (titlePosition.left - padding) < 0) {
                        increment = 25;

                        // don't shift too far
                        if (titlePosition.left + increment > padding) {
                            increment = padding - titlePosition.left;
                        }

                        adjust = true;
                    }

                    if (adjust) {
                        // adjust the position
                        title.css('left', (titlePosition.left + increment) + 'px');
                    }
                }
            });
        }
    };
}());