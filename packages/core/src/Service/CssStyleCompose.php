<?php

namespace FlexiCore\Service;

use FlexiCore\Core\{StubStorage, Constants};

class CssStyleCompose
{
  
  public static function get(array $answers, $themingMode, $theme)
  {
    $colors = StubStorage::get('themes.' . $theme);
    $icon = Constants::UI_ICONS[$answers['iconLibrary']];

    $headStyle =StubStorage::get("css.head-import");


    $plugin = "@plugin \"@iconify/tailwind4\" {\n  prefixes: $icon;\n  scale: 1.2;\n}\n";


    $config_theme = StubStorage::get("css.theme-config");
    $base_layer = StubStorage::get("css.base-layer");


    $darkOnly = StubStorage::get("css.base-dark");
    $lightOnly =  StubStorage::get("css.base-light");
    $both = StubStorage::get("css.base-both");

    $style = strtolower($themingMode) == 'both' ? $both : (strtolower($themingMode) == 'dark' ? $darkOnly : $lightOnly);

    $outputStyle = $headStyle . PHP_EOL . PHP_EOL . PHP_EOL . $plugin . PHP_EOL . PHP_EOL .   PHP_EOL  . $style . PHP_EOL . PHP_EOL . $colors . PHP_EOL . PHP_EOL . $config_theme . PHP_EOL . PHP_EOL . $base_layer;

    return $outputStyle;
  }
}
