<?php

namespace FlexiCore\Core;

class IconMapping
{
    public const MAP = [
        // User icons
        'ph--user' => ['heroicons' => 'heroicons--user', 'lucide' => 'lucide--user', 'hugeicons' => 'hugeicons--user', 'solar' => 'solar--user-linear'],
        'ph--user-circle' => ['heroicons' => 'heroicons--user-circle', 'lucide' => 'lucide--user-circle', 'hugeicons' => 'hugeicons--user-circle', 'solar' => 'solar--user-circle-linear'],
        'ph--user-bold' => ['heroicons' => 'heroicons--user-solid', 'lucide' => 'lucide--user', 'hugeicons' => 'hugeicons--user', 'solar' => 'solar--user-bold'],
        
        // Search icons
        'ph--magnifying-glass' => ['heroicons' => 'heroicons--magnifying-glass', 'lucide' => 'lucide--search', 'hugeicons' => 'hugeicons--search-01', 'solar' => 'solar--magnifer-linear'],
        'ph--magnifying-glass-bold' => ['heroicons' => 'heroicons--magnifying-glass', 'lucide' => 'lucide--search', 'hugeicons' => 'hugeicons--search-02', 'solar' => 'solar--magnifer-bold'],
        
        // Notification icons
        'ph--bell' => ['heroicons' => 'heroicons--bell', 'lucide' => 'lucide--bell', 'hugeicons' => 'hugeicons--notification-01', 'solar' => 'solar--bell-linear'],
        'ph--bell-ringing' => ['heroicons' => 'heroicons--bell-alert', 'lucide' => 'lucide--bell-ring', 'hugeicons' => 'hugeicons--notification-03', 'solar' => 'solar--bell-bing-linear'],
        'ph--bell-bold' => ['heroicons' => 'heroicons--bell', 'lucide' => 'lucide--bell', 'hugeicons' => 'hugeicons--notification-01', 'solar' => 'solar--bell-bold'],
        
        // Home icons
        'ph--house' => ['heroicons' => 'heroicons--home', 'lucide' => 'lucide--home', 'hugeicons' => 'hugeicons--home-02', 'solar' => 'solar--home-2-linear'],
        'ph--house-simple' => ['heroicons' => 'heroicons--home', 'lucide' => 'lucide--home', 'hugeicons' => 'hugeicons--home-01', 'solar' => 'solar--home-linear'],
        'ph--house-bold' => ['heroicons' => 'heroicons--home', 'lucide' => 'lucide--home', 'hugeicons' => 'hugeicons--home-01', 'solar' => 'solar--home-bold'],
        
        // Settings icons
        'ph--gear' => ['heroicons' => 'heroicons--cog-6-tooth', 'lucide' => 'lucide--settings', 'hugeicons' => 'hugeicons--settings-01', 'solar' => 'solar--settings-linear'],
        'ph--gear-six' => ['heroicons' => 'heroicons--cog-6-tooth', 'lucide' => 'lucide--settings', 'hugeicons' => 'hugeicons--settings-03', 'solar' => 'solar--settings-linear'],
        'ph--gear-bold' => ['heroicons' => 'heroicons--cog-6-tooth', 'lucide' => 'lucide--settings', 'hugeicons' => 'hugeicons--settings-02', 'solar' => 'solar--settings-bold'],
        
        // Sign out icons
        'ph--sign-out' => ['heroicons' => 'heroicons--arrow-right-on-rectangle', 'lucide' => 'lucide--log-out', 'hugeicons' => 'hugeicons--logout-02', 'solar' => 'solar--logout-2-linear'],
        'ph--sign-out-bold' => ['heroicons' => 'heroicons--arrow-right-on-rectangle', 'lucide' => 'lucide--log-out', 'hugeicons' => 'hugeicons--logout-01', 'solar' => 'solar--logout-2-bold'],
        
        // Plus/Minus icons
        'ph--plus' => ['heroicons' => 'heroicons--plus', 'lucide' => 'lucide--plus', 'hugeicons' => 'hugeicons--plus-sign', 'solar' => 'solar--add-circle-linear'],
        'ph--plus-bold' => ['heroicons' => 'heroicons--plus', 'lucide' => 'lucide--plus', 'hugeicons' => 'hugeicons--plus-sign', 'solar' => 'solar--add-circle-bold'],
        'ph--minus' => ['heroicons' => 'heroicons--minus', 'lucide' => 'lucide--minus', 'hugeicons' => 'hugeicons--minus-sign', 'solar' => 'solar--minus-circle-linear'],
        'ph--minus-bold' => ['heroicons' => 'heroicons--minus', 'lucide' => 'lucide--minus', 'hugeicons' => 'hugeicons--minus-sign', 'solar' => 'solar--minus-circle-bold'],
        
        // Close/Check icons
        'ph--x' => ['heroicons' => 'heroicons--x-mark', 'lucide' => 'lucide--x', 'hugeicons' => 'hugeicons--cancel-01', 'solar' => 'solar--close-circle-linear'],
        'ph--x-bold' => ['heroicons' => 'heroicons--x-mark', 'lucide' => 'lucide--x', 'hugeicons' => 'hugeicons--cancel-01', 'solar' => 'solar--close-circle-bold'],
        'ph--check' => ['heroicons' => 'heroicons--check', 'lucide' => 'lucide--check', 'hugeicons' => 'hugeicons--tick-01', 'solar' => 'solar--check-circle-linear'],
        'ph--check-bold' => ['heroicons' => 'heroicons--check', 'lucide' => 'lucide--check', 'hugeicons' => 'hugeicons--tick-02', 'solar' => 'solar--check-circle-bold'],
        
        // Arrow icons
        'ph--arrow-left' => ['heroicons' => 'heroicons--arrow-left', 'lucide' => 'lucide--arrow-left', 'hugeicons' => 'hugeicons--arrow-left-02', 'solar' => 'solar--arrow-left-linear'],
        'ph--arrow-right' => ['heroicons' => 'heroicons--arrow-right', 'lucide' => 'lucide--arrow-right', 'hugeicons' => 'hugeicons--arrow-right-02', 'solar' => 'solar--arrow-right-linear'],
        'ph--arrow-up' => ['heroicons' => 'heroicons--arrow-up', 'lucide' => 'lucide--arrow-up', 'hugeicons' => 'hugeicons--arrow-up-02', 'solar' => 'solar--arrow-up-linear'],
        'ph--arrow-down' => ['heroicons' => 'heroicons--arrow-down', 'lucide' => 'lucide--arrow-down', 'hugeicons' => 'hugeicons--arrow-down-02', 'solar' => 'solar--arrow-down-linear'],
        'ph--arrow-left-bold' => ['heroicons' => 'heroicons--arrow-left', 'lucide' => 'lucide--arrow-left', 'hugeicons' => 'hugeicons--arrow-left-02', 'solar' => 'solar--arrow-left-bold'],
        'ph--arrow-right-bold' => ['heroicons' => 'heroicons--arrow-right', 'lucide' => 'lucide--arrow-right', 'hugeicons' => 'hugeicons--arrow-right-02', 'solar' => 'solar--arrow-right-bold'],
        
        // Caret icons
        'ph--caret-left' => ['heroicons' => 'heroicons--chevron-left', 'lucide' => 'lucide--chevron-left', 'hugeicons' => 'hugeicons--arrow-left-01', 'solar' => 'solar--alt-arrow-left-linear'],
        'ph--caret-right' => ['heroicons' => 'heroicons--chevron-right', 'lucide' => 'lucide--chevron-right', 'hugeicons' => 'hugeicons--arrow-right-01', 'solar' => 'solar--alt-arrow-right-linear'],
        'ph--caret-up' => ['heroicons' => 'heroicons--chevron-up', 'lucide' => 'lucide--chevron-up', 'hugeicons' => 'hugeicons--arrow-up-01', 'solar' => 'solar--alt-arrow-up-linear'],
        'ph--caret-down' => ['heroicons' => 'heroicons--chevron-down', 'lucide' => 'lucide--chevron-down', 'hugeicons' => 'hugeicons--arrow-down-01', 'solar' => 'solar--alt-arrow-down-linear'],
        
        // Delete/Edit icons
        'ph--trash' => ['heroicons' => 'heroicons--trash', 'lucide' => 'lucide--trash-2', 'hugeicons' => 'hugeicons--delete-02', 'solar' => 'solar--trash-bin-trash-linear'],
        'ph--trash-bold' => ['heroicons' => 'heroicons--trash', 'lucide' => 'lucide--trash-2', 'hugeicons' => 'hugeicons--delete-03', 'solar' => 'solar--trash-bin-trash-bold'],
        'ph--pencil' => ['heroicons' => 'heroicons--pencil', 'lucide' => 'lucide--pencil', 'hugeicons' => 'hugeicons--pencil-edit-01', 'solar' => 'solar--pen-linear'],
        'ph--pencil-simple' => ['heroicons' => 'heroicons--pencil', 'lucide' => 'lucide--pencil', 'hugeicons' => 'hugeicons--pencil-edit-02', 'solar' => 'solar--pen-linear'],
        'ph--pencil-bold' => ['heroicons' => 'heroicons--pencil', 'lucide' => 'lucide--pencil', 'hugeicons' => 'hugeicons--pen-02', 'solar' => 'solar--pen-bold'],
        
        // Visibility icons
        'ph--eye' => ['heroicons' => 'heroicons--eye', 'lucide' => 'lucide--eye', 'hugeicons' => 'hugeicons--eye', 'solar' => 'solar--eye-linear'],
        'ph--eye-slash' => ['heroicons' => 'heroicons--eye-slash', 'lucide' => 'lucide--eye-off', 'hugeicons' => 'hugeicons--view-off-slash', 'solar' => 'solar--eye-closed-linear'],
        'ph--eye-bold' => ['heroicons' => 'heroicons--eye', 'lucide' => 'lucide--eye', 'hugeicons' => 'hugeicons--eye', 'solar' => 'solar--eye-bold'],
        
        // Lock icons
        'ph--lock' => ['heroicons' => 'heroicons--lock-closed', 'lucide' => 'lucide--lock', 'hugeicons' => 'hugeicons--lock-key', 'solar' => 'solar--lock-linear'],
        'ph--lock-key' => ['heroicons' => 'heroicons--key', 'lucide' => 'lucide--key', 'hugeicons' => 'hugeicons--key-02', 'solar' => 'solar--key-linear'],
        'ph--lock-bold' => ['heroicons' => 'heroicons--lock-closed', 'lucide' => 'lucide--lock', 'hugeicons' => 'hugeicons--lock', 'solar' => 'solar--lock-bold'],
        'ph--unlock' => ['heroicons' => 'heroicons--lock-open', 'lucide' => 'lucide--unlock', 'hugeicons' => 'hugeicons--circle-unlock-02', 'solar' => 'solar--lock-unlocked-linear'],
        
        // Communication icons
        'ph--envelope' => ['heroicons' => 'heroicons--envelope', 'lucide' => 'lucide--mail', 'hugeicons' => 'hugeicons--mail-01', 'solar' => 'solar--letter-linear'],
        'ph--envelope-simple' => ['heroicons' => 'heroicons--envelope', 'lucide' => 'lucide--mail', 'hugeicons' => 'hugeicons--mail-01', 'solar' => 'solar--letter-linear'],
        'ph--envelope-bold' => ['heroicons' => 'heroicons--envelope', 'lucide' => 'lucide--mail', 'hugeicons' => 'hugeicons--mail-01', 'solar' => 'solar--letter-bold'],
        'ph--key' => ['heroicons' => 'heroicons--key', 'lucide' => 'lucide--key', 'hugeicons' => 'hugeicons--key-01', 'solar' => 'solar--key-linear'],
        'ph--key-bold' => ['heroicons' => 'heroicons--key', 'lucide' => 'lucide--key', 'hugeicons' => 'hugeicons--key-02', 'solar' => 'solar--key-bold'],
        
        // Date/Time icons
        'ph--calendar' => ['heroicons' => 'heroicons--calendar', 'lucide' => 'lucide--calendar', 'hugeicons' => 'hugeicons--calendar-01', 'solar' => 'solar--calendar-linear'],
        'ph--calendar-blank' => ['heroicons' => 'heroicons--calendar', 'lucide' => 'lucide--calendar', 'hugeicons' => 'hugeicons--calendar-02', 'solar' => 'solar--calendar-linear'],
        'ph--calendar-bold' => ['heroicons' => 'heroicons--calendar', 'lucide' => 'lucide--calendar', 'hugeicons' => 'hugeicons--calendar-01', 'solar' => 'solar--calendar-bold'],
        'ph--clock' => ['heroicons' => 'heroicons--clock', 'lucide' => 'lucide--clock', 'hugeicons' => 'hugeicons--clock-01', 'solar' => 'solar--clock-circle-linear'],
        'ph--clock-bold' => ['heroicons' => 'heroicons--clock', 'lucide' => 'lucide--clock', 'hugeicons' => 'hugeicons--clock-01', 'solar' => 'solar--clock-circle-bold'],
        'ph--clock-clockwise' => ['heroicons' => 'heroicons--arrow-path', 'lucide' => 'lucide--rotate-cw', 'hugeicons' => 'hugeicons--rotate-clockwise', 'solar' => 'solar--refresh-circle-linear'],
        
        // Media icons
        'ph--image' => ['heroicons' => 'heroicons--photo', 'lucide' => 'lucide--image', 'hugeicons' => 'hugeicons--image-01', 'solar' => 'solar--gallery-linear'],
        'ph--image-bold' => ['heroicons' => 'heroicons--photo', 'lucide' => 'lucide--image', 'hugeicons' => 'hugeicons--image-02', 'solar' => 'solar--gallery-bold'],
        'ph--file' => ['heroicons' => 'heroicons--document', 'lucide' => 'lucide--file', 'hugeicons' => 'hugeicons--file-01', 'solar' => 'solar--file-linear'],
        'ph--file-text' => ['heroicons' => 'heroicons--document-text', 'lucide' => 'lucide--file-text', 'hugeicons' => 'hugeicons--file-02', 'solar' => 'solar--file-text-linear'],
        'ph--file-bold' => ['heroicons' => 'heroicons--document', 'lucide' => 'lucide--file', 'hugeicons' => 'hugeicons--file-01', 'solar' => 'solar--file-bold'],
        'ph--folder' => ['heroicons' => 'heroicons--folder', 'lucide' => 'lucide--folder', 'hugeicons' => 'hugeicons--folder-01', 'solar' => 'solar--folder-linear'],
        'ph--folder-open' => ['heroicons' => 'heroicons--folder-open', 'lucide' => 'lucide--folder-open', 'hugeicons' => 'hugeicons--folder-open', 'solar' => 'solar--folder-open-linear'],
        
        // Transfer icons
        'ph--download' => ['heroicons' => 'heroicons--arrow-down-tray', 'lucide' => 'lucide--download', 'hugeicons' => 'hugeicons--download-01', 'solar' => 'solar--download-linear'],
        'ph--download-bold' => ['heroicons' => 'heroicons--arrow-down-tray', 'lucide' => 'lucide--download', 'hugeicons' => 'hugeicons--download-01', 'solar' => 'solar--download-bold'],
        'ph--upload' => ['heroicons' => 'heroicons--arrow-up-tray', 'lucide' => 'lucide--upload', 'hugeicons' => 'hugeicons--upload-01', 'solar' => 'solar--upload-linear'],
        'ph--upload-bold' => ['heroicons' => 'heroicons--arrow-up-tray', 'lucide' => 'lucide--upload', 'hugeicons' => 'hugeicons--upload-01', 'solar' => 'solar--upload-bold'],
        
        // Link/Share icons
        'ph--link' => ['heroicons' => 'heroicons--link', 'lucide' => 'lucide--link', 'hugeicons' => 'hugeicons--link-01', 'solar' => 'solar--link-linear'],
        'ph--link-bold' => ['heroicons' => 'heroicons--link', 'lucide' => 'lucide--link', 'hugeicons' => 'hugeicons--link-01', 'solar' => 'solar--link-bold'],
        'ph--share' => ['heroicons' => 'heroicons--share', 'lucide' => 'lucide--share-2', 'hugeicons' => 'hugeicons--share-01', 'solar' => 'solar--share-linear'],
        'ph--share-network' => ['heroicons' => 'heroicons--share', 'lucide' => 'lucide--share-2', 'hugeicons' => 'hugeicons--share-01', 'solar' => 'solar--share-linear'],
        
        // Favorite icons
        'ph--heart' => ['heroicons' => 'heroicons--heart', 'lucide' => 'lucide--heart', 'hugeicons' => 'hugeicons--favourite', 'solar' => 'solar--heart-linear'],
        'ph--heart-bold' => ['heroicons' => 'heroicons--heart', 'lucide' => 'lucide--heart', 'hugeicons' => 'hugeicons--favourite', 'solar' => 'solar--heart-bold'],
        'ph--star' => ['heroicons' => 'heroicons--star', 'lucide' => 'lucide--star', 'hugeicons' => 'hugeicons--star', 'solar' => 'solar--star-linear'],
        'ph--star-bold' => ['heroicons' => 'heroicons--star', 'lucide' => 'lucide--star', 'hugeicons' => 'hugeicons--star', 'solar' => 'solar--star-bold'],
        
        // Menu icons
        'ph--menu' => ['heroicons' => 'heroicons--bars-3', 'lucide' => 'lucide--menu', 'hugeicons' => 'hugeicons--menu-01', 'solar' => 'solar--hamburger-menu-linear'],
        'ph--list' => ['heroicons' => 'heroicons--list-bullet', 'lucide' => 'lucide--list', 'hugeicons' => 'hugeicons--left-to-right-list-bullet', 'solar' => 'solar--list-linear'],
        'ph--grid' => ['heroicons' => 'heroicons--squares-2x2', 'lucide' => 'lucide--grid-3x3', 'hugeicons' => 'hugeicons--grid', 'solar' => 'solar--widget-2-linear'],
        'ph--squares-four' => ['heroicons' => 'heroicons--squares-2x2', 'lucide' => 'lucide--grid-3x3', 'hugeicons' => 'hugeicons--grid', 'solar' => 'solar--widget-2-linear'],
        'ph--dots-three' => ['heroicons' => 'heroicons--ellipsis-horizontal', 'lucide' => 'lucide--more-horizontal', 'hugeicons' => 'hugeicons--more-horizontal', 'solar' => 'solar--menu-dots-linear'],
        'ph--dots-three-vertical' => ['heroicons' => 'heroicons--ellipsis-vertical', 'lucide' => 'lucide--more-vertical', 'hugeicons' => 'hugeicons--more-vertical', 'solar' => 'solar--menu-dots-vertical-linear'],
        
        // Alert icons
        'ph--warning' => ['heroicons' => 'heroicons--exclamation-triangle', 'lucide' => 'lucide--alert-triangle', 'hugeicons' => 'hugeicons--alert-01', 'solar' => 'solar--danger-triangle-linear'],
        'ph--warning-bold' => ['heroicons' => 'heroicons--exclamation-triangle', 'lucide' => 'lucide--alert-triangle', 'hugeicons' => 'hugeicons--alert-01', 'solar' => 'solar--danger-triangle-bold'],
        'ph--info' => ['heroicons' => 'heroicons--information-circle', 'lucide' => 'lucide--info', 'hugeicons' => 'hugeicons--alert-circle', 'solar' => 'solar--info-circle-linear'],
        'ph--info-bold' => ['heroicons' => 'heroicons--information-circle', 'lucide' => 'lucide--info', 'hugeicons' => 'hugeicons--alert-circle', 'solar' => 'solar--info-circle-bold'],
        'ph--question' => ['heroicons' => 'heroicons--question-mark-circle', 'lucide' => 'lucide--help-circle', 'hugeicons' => 'hugeicons--question', 'solar' => 'solar--question-circle-linear'],
        'ph--question-bold' => ['heroicons' => 'heroicons--question-mark-circle', 'lucide' => 'lucide--help-circle', 'hugeicons' => 'hugeicons--question', 'solar' => 'solar--question-circle-bold'],
        'ph--smiley-sad' => ['heroicons' => 'heroicons--face-frown', 'lucide' => 'lucide--frown', 'hugeicons' => 'hugeicons--sad-01', 'solar' => 'solar--sad-circle-linear'],
        'ph--lightbulb-filament' => ['heroicons' => 'heroicons--light-bulb', 'lucide' => 'lucide--lightbulb', 'hugeicons' => 'hugeicons--idea', 'solar' => 'solar--lightbulb-linear'],
        
        // Shape icons
        'ph--circle' => ['heroicons' => 'heroicons--circle', 'lucide' => 'lucide--circle', 'hugeicons' => 'hugeicons--circle', 'solar' => 'solar--circle-linear'],
        'ph--circle-filled' => ['heroicons' => 'heroicons--check-circle', 'lucide' => 'lucide--circle', 'hugeicons' => 'hugeicons--circle', 'solar' => 'solar--check-circle-bold'],
        'ph--square' => ['heroicons' => 'heroicons--square-3-stack-3d', 'lucide' => 'lucide--square', 'hugeicons' => 'hugeicons--square', 'solar' => 'solar--square-linear'],
        'ph--square-filled' => ['heroicons' => 'heroicons--square-3-stack-3d', 'lucide' => 'lucide--square', 'hugeicons' => 'hugeicons--square', 'solar' => 'solar--square-bold'],
    ];
}
