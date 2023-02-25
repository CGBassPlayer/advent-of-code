package com.cgbassplayer.aoc2019.common;

import lombok.experimental.UtilityClass;

import java.io.*;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@UtilityClass
public class InputReader {

    List<String> singleLineInput(Integer dayNumber) {
        InputStream is = loadResource(dayNumber);
        if (is == null) return null;
        try (InputStreamReader isr = new InputStreamReader(is);
             BufferedReader reader = new BufferedReader(isr)) {
            return Arrays.stream(reader
                    .readLine()
                    .split(","))
                    .toList();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    List<String> multiLineInput(Integer dayNumber) {
        InputStream is = loadResource(dayNumber);
        if (is == null) return null;
        try (InputStreamReader isr = new InputStreamReader(is);
             BufferedReader reader = new BufferedReader(isr)) {
            return reader
                    .lines()
                    .collect(Collectors.toList());
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    private InputStream loadResource(Integer day) {
        return InputReader
                .class
                .getClassLoader()
                .getResourceAsStream("input_files/day" + String.format("%02d", day) + ".txt");
    }
}
