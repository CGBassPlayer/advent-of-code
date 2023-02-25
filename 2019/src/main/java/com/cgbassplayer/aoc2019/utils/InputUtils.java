package com.cgbassplayer.aoc2019.utils;

import lombok.experimental.UtilityClass;

import java.util.List;
import java.util.stream.Collectors;

@UtilityClass
public class InputUtils {
    public List<Integer> toIntList(List<String> inputList) {
        return inputList
                .stream()
                .map(Integer::parseInt)
                .collect(Collectors.toList());
    }
}
