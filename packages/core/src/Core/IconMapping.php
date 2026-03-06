<?php

namespace FlexiCore\Core;

class IconMapping
{
    public const MAP = [
        // User icons
        'ph--user' => ['heroicons' => 'heroicons--user', 'lucide' => 'lucide--user', 'hugeicons' => 'hugeicons--user'],
        'ph--user-circle' => ['heroicons' => 'heroicons--user-circle', 'lucide' => 'lucide--user-circle', 'hugeicons' => 'hugeicons--user-circle'],
        'ph--user-bold' => ['heroicons' => 'heroicons--user-solid', 'lucide' => 'lucide--user', 'hugeicons' => 'hugeicons--user'],
        
        // Search icons
        'ph--magnifying-glass' => ['heroicons' => 'heroicons--magnifying-glass', 'lucide' => 'lucide--search', 'hugeicons' => 'hugeicons--search-01'],
        'ph--magnifying-glass-bold' => ['heroicons' => 'heroicons--magnifying-glass', 'lucide' => 'lucide--search', 'hugeicons' => 'hugeicons--search-02'],
        
        // Notification icons
        'ph--bell' => ['heroicons' => 'heroicons--bell', 'lucide' => 'lucide--bell', 'hugeicons' => 'hugeicons--notification-01'],
        'ph--bell-ringing' => ['heroicons' => 'heroicons--bell-alert', 'lucide' => 'lucide--bell-ring', 'hugeicons' => 'hugeicons--notification-03'],
        'ph--bell-bold' => ['heroicons' => 'heroicons--bell', 'lucide' => 'lucide--bell', 'hugeicons' => 'hugeicons--notification-01'],
        
        // Home icons
        'ph--house' => ['heroicons' => 'heroicons--home', 'lucide' => 'lucide--home', 'hugeicons' => 'hugeicons--home-02'],
        'ph--house-simple' => ['heroicons' => 'heroicons--home', 'lucide' => 'lucide--home', 'hugeicons' => 'hugeicons--home-01'],
        'ph--house-bold' => ['heroicons' => 'heroicons--home', 'lucide' => 'lucide--home', 'hugeicons' => 'hugeicons--home-01'],
        
        // Settings icons
        'ph--gear' => ['heroicons' => 'heroicons--cog-6-tooth', 'lucide' => 'lucide--settings', 'hugeicons' => 'hugeicons--settings-01'],
        'ph--gear-six' => ['heroicons' => 'heroicons--cog-6-tooth', 'lucide' => 'lucide--settings', 'hugeicons' => 'hugeicons--settings-03'],
        'ph--gear-bold' => ['heroicons' => 'heroicons--cog-6-tooth', 'lucide' => 'lucide--settings', 'hugeicons' => 'hugeicons--settings-02'],
        
        // Sign out icons
        'ph--sign-out' => ['heroicons' => 'heroicons--arrow-right-on-rectangle', 'lucide' => 'lucide--log-out', 'hugeicons' => 'hugeicons--logout-02'],
        'ph--sign-out-bold' => ['heroicons' => 'heroicons--arrow-right-on-rectangle', 'lucide' => 'lucide--log-out', 'hugeicons' => 'hugeicons--logout-01'],
        
        // Plus/Minus icons
        'ph--plus' => ['heroicons' => 'heroicons--plus', 'lucide' => 'lucide--plus', 'hugeicons' => 'hugeicons--plus-sign'],
        'ph--plus-bold' => ['heroicons' => 'heroicons--plus', 'lucide' => 'lucide--plus', 'hugeicons' => 'hugeicons--plus-sign'],
        'ph--minus' => ['heroicons' => 'heroicons--minus', 'lucide' => 'lucide--minus', 'hugeicons' => 'hugeicons--minus-sign'],
        'ph--minus-bold' => ['heroicons' => 'heroicons--minus', 'lucide' => 'lucide--minus', 'hugeicons' => 'hugeicons--minus-sign'],
        
        // Close/Check icons
        'ph--x' => ['heroicons' => 'heroicons--x-mark', 'lucide' => 'lucide--x', 'hugeicons' => 'hugeicons--cancel-01'],
        'ph--x-bold' => ['heroicons' => 'heroicons--x-mark', 'lucide' => 'lucide--x', 'hugeicons' => 'hugeicons--cancel-01'],
        'ph--check' => ['heroicons' => 'heroicons--check', 'lucide' => 'lucide--check', 'hugeicons' => 'hugeicons--tick-01'],
        'ph--check-bold' => ['heroicons' => 'heroicons--check', 'lucide' => 'lucide--check', 'hugeicons' => 'hugeicons--tick-02'],
        
        // Arrow icons
        'ph--arrow-left' => ['heroicons' => 'heroicons--arrow-left', 'lucide' => 'lucide--arrow-left', 'hugeicons' => 'hugeicons--arrow-left-02'],
        'ph--arrow-right' => ['heroicons' => 'heroicons--arrow-right', 'lucide' => 'lucide--arrow-right', 'hugeicons' => 'hugeicons--arrow-right-02'],
        'ph--arrow-up' => ['heroicons' => 'heroicons--arrow-up', 'lucide' => 'lucide--arrow-up', 'hugeicons' => 'hugeicons--arrow-up-02'],
        'ph--arrow-down' => ['heroicons' => 'heroicons--arrow-down', 'lucide' => 'lucide--arrow-down', 'hugeicons' => 'hugeicons--arrow-down-02'],
        'ph--arrow-left-bold' => ['heroicons' => 'heroicons--arrow-left', 'lucide' => 'lucide--arrow-left', 'hugeicons' => 'hugeicons--arrow-left-02'],
        'ph--arrow-right-bold' => ['heroicons' => 'heroicons--arrow-right', 'lucide' => 'lucide--arrow-right', 'hugeicons' => 'hugeicons--arrow-right-02'],
        
        // Caret icons
        'ph--caret-left' => ['heroicons' => 'heroicons--chevron-left', 'lucide' => 'lucide--chevron-left', 'hugeicons' => 'hugeicons--arrow-left-01'],
        'ph--caret-right' => ['heroicons' => 'heroicons--chevron-right', 'lucide' => 'lucide--chevron-right', 'hugeicons' => 'hugeicons--arrow-right-01'],
        'ph--caret-up' => ['heroicons' => 'heroicons--chevron-up', 'lucide' => 'lucide--chevron-up', 'hugeicons' => 'hugeicons--arrow-up-01'],
        'ph--caret-down' => ['heroicons' => 'heroicons--chevron-down', 'lucide' => 'lucide--chevron-down', 'hugeicons' => 'hugeicons--arrow-down-01'],
        
        // Delete/Edit icons
        'ph--trash' => ['heroicons' => 'heroicons--trash', 'lucide' => 'lucide--trash-2', 'hugeicons' => 'hugeicons--delete-02'],
        'ph--trash-bold' => ['heroicons' => 'heroicons--trash', 'lucide' => 'lucide--trash-2', 'hugeicons' => 'hugeicons--delete-03'],
        'ph--pencil' => ['heroicons' => 'heroicons--pencil', 'lucide' => 'lucide--pencil', 'hugeicons' => 'hugeicons--pencil-edit-01'],
        'ph--pencil-simple' => ['heroicons' => 'heroicons--pencil', 'lucide' => 'lucide--pencil', 'hugeicons' => 'hugeicons--pencil-edit-02'],
        'ph--pencil-bold' => ['heroicons' => 'heroicons--pencil', 'lucide' => 'lucide--pencil', 'hugeicons' => 'hugeicons--pen-02'],
        
        // Visibility icons
        'ph--eye' => ['heroicons' => 'heroicons--eye', 'lucide' => 'lucide--eye', 'hugeicons' => 'hugeicons--eye'],
        'ph--eye-slash' => ['heroicons' => 'heroicons--eye-slash', 'lucide' => 'lucide--eye-off', 'hugeicons' => 'hugeicons--view-off-slash'],
        'ph--eye-bold' => ['heroicons' => 'heroicons--eye', 'lucide' => 'lucide--eye', 'hugeicons' => 'hugeicons--eye'],
        
        // Lock icons
        'ph--lock' => ['heroicons' => 'heroicons--lock-closed', 'lucide' => 'lucide--lock', 'hugeicons' => 'hugeicons--lock-key'],
        'ph--lock-key' => ['heroicons' => 'heroicons--key', 'lucide' => 'lucide--key', 'hugeicons' => 'hugeicons--key-02'],
        'ph--lock-bold' => ['heroicons' => 'heroicons--lock-closed', 'lucide' => 'lucide--lock', 'hugeicons' => 'hugeicons--lock'],
        'ph--unlock' => ['heroicons' => 'heroicons--lock-open', 'lucide' => 'lucide--unlock', 'hugeicons' => 'hugeicons--circle-unlock-02'],
        
        // Communication icons
        'ph--envelope' => ['heroicons' => 'heroicons--envelope', 'lucide' => 'lucide--mail', 'hugeicons' => 'hugeicons--mail-01'],
        'ph--envelope-simple' => ['heroicons' => 'heroicons--envelope', 'lucide' => 'lucide--mail', 'hugeicons' => 'hugeicons--mail-01'],
        'ph--envelope-bold' => ['heroicons' => 'heroicons--envelope', 'lucide' => 'lucide--mail', 'hugeicons' => 'hugeicons--mail-01'],
        'ph--key' => ['heroicons' => 'heroicons--key', 'lucide' => 'lucide--key', 'hugeicons' => 'hugeicons--key-01'],
        'ph--key-bold' => ['heroicons' => 'heroicons--key', 'lucide' => 'lucide--key', 'hugeicons' => 'hugeicons--key-02'],
        
        // Date/Time icons
        'ph--calendar' => ['heroicons' => 'heroicons--calendar', 'lucide' => 'lucide--calendar', 'hugeicons' => 'hugeicons--calendar-01'],
        'ph--calendar-blank' => ['heroicons' => 'heroicons--calendar', 'lucide' => 'lucide--calendar', 'hugeicons' => 'hugeicons--calendar-02'],
        'ph--calendar-bold' => ['heroicons' => 'heroicons--calendar', 'lucide' => 'lucide--calendar', 'hugeicons' => 'hugeicons--calendar-01'],
        'ph--clock' => ['heroicons' => 'heroicons--clock', 'lucide' => 'lucide--clock', 'hugeicons' => 'hugeicons--clock-01'],
        'ph--clock-bold' => ['heroicons' => 'heroicons--clock', 'lucide' => 'lucide--clock', 'hugeicons' => 'hugeicons--clock-01'],
        'ph--clock-clockwise' => ['heroicons' => 'heroicons--arrow-path', 'lucide' => 'lucide--rotate-cw', 'hugeicons' => 'hugeicons--rotate-clockwise'],
        
        // Media icons
        'ph--image' => ['heroicons' => 'heroicons--photo', 'lucide' => 'lucide--image', 'hugeicons' => 'hugeicons--image-01'],
        'ph--image-bold' => ['heroicons' => 'heroicons--photo', 'lucide' => 'lucide--image', 'hugeicons' => 'hugeicons--image-02'],
        'ph--file' => ['heroicons' => 'heroicons--document', 'lucide' => 'lucide--file', 'hugeicons' => 'hugeicons--file-01'],
        'ph--file-text' => ['heroicons' => 'heroicons--document-text', 'lucide' => 'lucide--file-text', 'hugeicons' => 'hugeicons--file-02'],
        'ph--file-bold' => ['heroicons' => 'heroicons--document', 'lucide' => 'lucide--file', 'hugeicons' => 'hugeicons--file-01'],
        'ph--folder' => ['heroicons' => 'heroicons--folder', 'lucide' => 'lucide--folder', 'hugeicons' => 'hugeicons--folder-01'],
        'ph--folder-open' => ['heroicons' => 'heroicons--folder-open', 'lucide' => 'lucide--folder-open', 'hugeicons' => 'hugeicons--folder-open'],
        
        // Transfer icons
        'ph--download' => ['heroicons' => 'heroicons--arrow-down-tray', 'lucide' => 'lucide--download', 'hugeicons' => 'hugeicons--download-01'],
        'ph--download-bold' => ['heroicons' => 'heroicons--arrow-down-tray', 'lucide' => 'lucide--download', 'hugeicons' => 'hugeicons--download-01'],
        'ph--upload' => ['heroicons' => 'heroicons--arrow-up-tray', 'lucide' => 'lucide--upload', 'hugeicons' => 'hugeicons--upload-01'],
        'ph--upload-bold' => ['heroicons' => 'heroicons--arrow-up-tray', 'lucide' => 'lucide--upload', 'hugeicons' => 'hugeicons--upload-01'],
        
        // Link/Share icons
        'ph--link' => ['heroicons' => 'heroicons--link', 'lucide' => 'lucide--link', 'hugeicons' => 'hugeicons--link-01'],
        'ph--link-bold' => ['heroicons' => 'heroicons--link', 'lucide' => 'lucide--link', 'hugeicons' => 'hugeicons--link-01'],
        'ph--share' => ['heroicons' => 'heroicons--share', 'lucide' => 'lucide--share-2', 'hugeicons' => 'hugeicons--share-01'],
        'ph--share-network' => ['heroicons' => 'heroicons--share', 'lucide' => 'lucide--share-2', 'hugeicons' => 'hugeicons--share-01'],
        
        // Favorite icons
        'ph--heart' => ['heroicons' => 'heroicons--heart', 'lucide' => 'lucide--heart', 'hugeicons' => 'hugeicons--favourite'],
        'ph--heart-bold' => ['heroicons' => 'heroicons--heart', 'lucide' => 'lucide--heart', 'hugeicons' => 'hugeicons--favourite'],
        'ph--star' => ['heroicons' => 'heroicons--star', 'lucide' => 'lucide--star', 'hugeicons' => 'hugeicons--star'],
        'ph--star-bold' => ['heroicons' => 'heroicons--star', 'lucide' => 'lucide--star', 'hugeicons' => 'hugeicons--star'],
        
        // Menu icons
        'ph--menu' => ['heroicons' => 'heroicons--bars-3', 'lucide' => 'lucide--menu', 'hugeicons' => 'hugeicons--menu-01'],
        'ph--list' => ['heroicons' => 'heroicons--list-bullet', 'lucide' => 'lucide--list', 'hugeicons' => 'hugeicons--left-to-right-list-bullet'],
        'ph--grid' => ['heroicons' => 'heroicons--squares-2x2', 'lucide' => 'lucide--grid-3x3', 'hugeicons' => 'hugeicons--grid'],
        'ph--squares-four' => ['heroicons' => 'heroicons--squares-2x2', 'lucide' => 'lucide--grid-3x3', 'hugeicons' => 'hugeicons--grid'],
        'ph--dots-three' => ['heroicons' => 'heroicons--ellipsis-horizontal', 'lucide' => 'lucide--more-horizontal', 'hugeicons' => 'hugeicons--more-horizontal'],
        'ph--dots-three-vertical' => ['heroicons' => 'heroicons--ellipsis-vertical', 'lucide' => 'lucide--more-vertical', 'hugeicons' => 'hugeicons--more-vertical'],
        
        // Alert icons
        'ph--warning' => ['heroicons' => 'heroicons--exclamation-triangle', 'lucide' => 'lucide--alert-triangle', 'hugeicons' => 'hugeicons--alert-01'],
        'ph--warning-bold' => ['heroicons' => 'heroicons--exclamation-triangle', 'lucide' => 'lucide--alert-triangle', 'hugeicons' => 'hugeicons--alert-01'],
        'ph--info' => ['heroicons' => 'heroicons--information-circle', 'lucide' => 'lucide--info', 'hugeicons' => 'hugeicons--alert-circle'],
        'ph--info-bold' => ['heroicons' => 'heroicons--information-circle', 'lucide' => 'lucide--info', 'hugeicons' => 'hugeicons--alert-circle'],
        'ph--question' => ['heroicons' => 'heroicons--question-mark-circle', 'lucide' => 'lucide--help-circle', 'hugeicons' => 'hugeicons--question'],
        'ph--question-bold' => ['heroicons' => 'heroicons--question-mark-circle', 'lucide' => 'lucide--help-circle', 'hugeicons' => 'hugeicons--question'],
        'ph--smiley-sad' => ['heroicons' => 'heroicons--face-frown', 'lucide' => 'lucide--frown', 'hugeicons' => 'hugeicons--sad-01'],
        'ph--lightbulb-filament' => ['heroicons' => 'heroicons--light-bulb', 'lucide' => 'lucide--lightbulb', 'hugeicons' => 'hugeicons--idea'],
        
        // Shape icons
        'ph--circle' => ['heroicons' => 'heroicons--circle', 'lucide' => 'lucide--circle', 'hugeicons' => 'hugeicons--circle'],
        'ph--circle-filled' => ['heroicons' => 'heroicons--check-circle', 'lucide' => 'lucide--circle', 'hugeicons' => 'hugeicons--circle'],
        'ph--square' => ['heroicons' => 'heroicons--square-3-stack-3d', 'lucide' => 'lucide--square', 'hugeicons' => 'hugeicons--square'],
        'ph--square-filled' => ['heroicons' => 'heroicons--square-3-stack-3d', 'lucide' => 'lucide--square', 'hugeicons' => 'hugeicons--square'],
    ];
}
