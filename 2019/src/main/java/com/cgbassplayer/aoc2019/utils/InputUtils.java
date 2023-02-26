package com.cgbassplayer.aoc2019.utils;

import lombok.experimental.UtilityClass;

import java.util.Arrays;
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

    public List<String> getStringListFromLine(List<String> input, Integer lineNumber, String delimiter) {
        return Arrays
                .stream(input
                        .get(lineNumber)
                        .split(delimiter))
                .collect(Collectors.toList());
    }
}
