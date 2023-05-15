<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Time Tracker</title>
    <link rel="stylesheet" href="<?=  base_url('assets/css/style.css'); ?>" />

    <!-- CSS Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">

    <!-- Javascript Bootstrap  -->
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
        integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous">
    </script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js"
        integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh" crossorigin="anonymous">
    </script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js"
        integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ" crossorigin="anonymous">
    </script>

    <!-- FONT AWESOME  -->
    <script src="https://kit.fontawesome.com/27dab9bfc1.js" crossorigin="anonymous"></script>

</head>

<body>
    <div class="container-fluid">

        <div class="main-component-wrapper">

            <div class="row">
                <div class="col-sm-8 input-task">
                    <div class="input-group">
                        <input id="task-class" type="text" autofocus class="form-control"
                            placeholder="What are you working on?" aria-label="task" aria-describedby="basic-addon1">
                    </div>
                </div>
                <div class="col-sm-4 create-project">
                    <div id="selected-project">
                        <!-- Selected project will update here  -->
                    </div>
                    <div class="dropdown">
                        <div type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fa fa-light fa-circle-plus" style="color: #03a9f4;"></i> <span
                                id="project-name">Project</span>
                        </div>
                        <ul class="dropdown-menu">
                            <a class="dropdown-item" data-value="Fix the UI">Fix the UI <button class="cross-btn"
                                    style="margin-right:1rem;"><i class="fa fa-thin fa-xmark"></i></button></a>

                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li data-bs-toggle="modal" data-bs-target="#projectModal"><a class="dropdown-item" href="#"
                                    style="font-weight:500;">Create new Project <i style="font-size:0.9rem !important;"
                                        class="fa fa-light fa-circle-plus"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Modal -->

            <div class="modal fade" id="projectModal" tabindex="-1" aria-labelledby="projectModalLabel"
                aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="fs-5" id="modal-title">Create New Project</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">

                            <div class="mb-3">
                                <label for="newproject-name" class="col-form-label">Project Name:</label>
                                <input type="text" class="form-control" id="newproject-name" autocomplete="off"
                                    autofocus class="project-input">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="close-btn" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="blue-btn" id="create-btn">Create</button>
                        </div>
                    </div>
                </div>
            </div>

            <hr>

            <div class="second-row">
                <div class="col-sm-8 tag-bill">

                    <div class="dropdown">
                        <i class="fas fa-regular fa-tag tag-icon" id="tag-dropdown" data-bs-toggle="dropdown"></i>
                        <ul class="dropdown-menu" id="tag-dropdown-menu" aria-labelledby="tag-dropdown">
                            <!-- dropdown items will be dynamically generated here -->
                        </ul>
                    </div>

                    <div id="main-tags">
                        <!-- tags will be dynamically generated here  -->
                        <div id="display-tags" class="timer-tag"></div>
                    </div>

                    <div id="bill" class="bill-icon">
                        <i class="fa-regular fa-dollar-sign"></i>
                    </div>
                </div>

                <div class="col-sm-4">
                    <div class="timer">
                        <div id="time-display" class="time">
                            00:00:00
                        </div>
                        <div id="start-btn" class="btn blue-btn">
                            <span id="toggle-text">Start</span>
                        </div>
                        <i class="fas fa-regular fa-ellipsis-vertical" style="cursor: pointer"></i>
                    </div>
                </div>

            </div>

        </div>

        <div id="task-wrapper">

            <div id="date-area"></div>

            <diV id="task-component-area">

                <div id="task-wrapper"> </div>

                <!-- Task Component generate here  -->

                <!-- <?php foreach ($tasks as $task): ?>
                <div class="task-component" id="<?php echo $task['id']; ?>">
                    <div class="top">
                        <?php
                        $taskComponentTime = json_decode($task['taskComponentTime'], true);
                        $totalTime = isset($taskComponentTime['totalTime']) ? $taskComponentTime['totalTime'] : '';
                    ?>
                        <div id="inherited-time">Total Time: <?php echo $totalTime; ?></div>
                    </div>
                    <hr>
                    <div class="bottom">

                        <input type='checkbox' class="checkbox">
                        <div class="left">
                            <div>
                                <div id="task-name"><?php echo $task['taskName']; ?></div>
                            </div>

                            <div id="task-project-name">
                                <?php echo $task['projectName'] ? '●' . $task['projectName'] : ''; ?>
                            </div>

                            <div id="task-tags" class="timer-tag">
                                <?php
                            $tags = json_decode($task['tags'], true);
                            if (is_array($tags)) {
                                foreach ($tags as $tag) {
                                    echo '<span class="timer-tags">' . $tag . '</span>';
                                }
                            }
                            ?>
                            </div>


                            <div id="task-bill" class="<?php echo $task['billColor']; ?>">
                                <i id="bill" class="fa-regular fa-dollar-sign"></i>
                            </div>
                            |
                        </div>

                        <div class="right">
                            <div id="display-resume-time">
                                <?php
                            $taskComponentTime = json_decode($task['taskComponentTime'], true);
                            $resumeTime = isset($taskComponentTime['resumeTime']) ? $taskComponentTime['resumeTime'] : '';
                        ?>
                                <?php echo $resumeTime; ?>
                            </div>
                            <div id="resume-btn-<?php echo $task['id']; ?>" data-component-id="<?php echo $task['id']; ?>">
                                <i id="toggle-btn" class="fa-solid fa-play"></i>
                            </div>
                            <div id="delete-btn-<?php echo $task['id']; ?>">
                                <i class="fa fa-regular fa-trash-alt" data-component-id="<?php echo $task['id']; ?>"
                                    data-target="#deleteModal" data-toggle="modal"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <?php endforeach; ?> -->

            </div>


        </div>
        <script src="https://code.jquery.com/jquery-3.6.4.min.js"
            integrity="sha256-oP6HI9z1XaZNBrJURtCoUT5SUnxFr8s3BzRl+cbzUq8=" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous">
        </script>

        <script type="text/javascript" src="<?=  base_url('assets/js/main.js'); ?>"></script>


</body>

</html>